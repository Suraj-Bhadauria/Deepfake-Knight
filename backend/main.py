# backend/main.py

import io
import base64
from click import command
import numpy as np
import torch
import cv2
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import ViTForImageClassification, ViTImageProcessor
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import tensorflow as tf
import sys 
import subprocess  
import re          
import tempfile


# Initialize FastAPI app and CORS
app = FastAPI(title="Deepfake Detector API")
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://[::1]:5173",  # Adding IPv6 support
    "*"  # TEMPORARY for debugging - will remove in production!
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure LLM
load_dotenv()
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.6)
print("Langchain with Google AI Model loaded successfully")

# Print GPU/CPU information at startup
print("\n" + "="*60)
print("SYSTEM DEVICE INFORMATION")
print("="*60)
print(f"PyTorch Version: {torch.__version__}")
print(f"CUDA Available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"CUDA Version: {torch.version.cuda}")
    print(f"GPU Device: {torch.cuda.get_device_name(0)}")
    print(f"GPU Count: {torch.cuda.device_count()}")
    print(f"Total GPU Memory: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.2f} GB")
else:
    print("Running on CPU only")
print("="*60 + "\n")




# Load the AI Models
# Image Model (ViT)
IMAGE_MODEL_PATH = "./image_model"
image_processor = ViTImageProcessor.from_pretrained(IMAGE_MODEL_PATH)
image_model = ViTForImageClassification.from_pretrained(IMAGE_MODEL_PATH)
image_model.eval()
print("Image Deepfake Model (ViT) loaded successfully!")

# VIDEO MODEL (GenConViT) - Load once at startup
print("\n" + "="*60)
print("Loading GenConViT Video Model (ED only - lighter)...")
print("="*60)
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'GenConViT'))
from model.pred_func import load_genconvit, df_face, pred_vid, real_or_fake
from model.config import load_config

genconvit_config = load_config()
video_model = load_genconvit(
    genconvit_config, 
    net='ed',  # Using only ED model (less RAM required)
    ed_weight='genconvit_ed_inference', 
    vae_weight=None,  # Don't load VAE to save memory
    fp16=False
)
print("✅ GenConViT ED Model loaded successfully!")
print("   → Network A (ED): Loaded")
print("   → Using single model for lower memory usage")
print("="*60 + "\n")



# LLM Explanation Function (LANGCHAIN)
async def get_llm_explanation(prediction_results:dict):
    """ Generates a human-friendly explanation of the using LangChain."""
    template = """
        You are an AI assistant for a deepfake detection application. Your task is to explain the result to a non-technical user in a clear, simple, and reassuring way.

        The deepfake detection model produced the following result:
        - Prediction: {predicted_class}
        - Confidence Score: {confidence_str}
        
        and file checked was of type {type}

        If file type is 'video', then model used is 'Generation Convolutional Vision Transformer'
        If file type is 'image', then model used is 'Vision Transformer'

        Based on this, generate a 2-3 sentence explanation.
        - If the prediction is 'FAKE', explain what that means and gently caution the user about the content.
        - If the prediction is 'REAL', explain that the image or video appears authentic according to the model, but remind them that no model is 100% perfect.
        - Also mention the modle used for the prediction based on the file type.
        - Keep the tone helpful and easy to understand.
    """
    prompt = PromptTemplate(
        template=template,
        input_variables=["predicted_class", "confidence_str", "type"]
    )
    parser = StrOutputParser()
    chain = prompt | llm | parser
    try:
        response = await chain.ainvoke(prediction_results)
        return response.strip()
    except Exception as e:
        print(f"Error calling LangChain LLM: {e}")
        return (
            f"The model determined the content is likely "
            f"{prediction_results['predicted_class'].lower()} with a confidence of "
            f"{prediction_results['confidence_str']}."
        )


# Attention Rollout Implementation for ViT (Better than Grad-CAM for ViT)
def generate_attention_heatmap(pixel_values_tensor, original_image, target_class=None):
    """Generate attention-based heatmap using attention rollout for ViT model"""
    
    # Forward pass to get attention weights
    with torch.no_grad():
        outputs = image_model(pixel_values=pixel_values_tensor, output_attentions=True)
    
    # Get all attention weights from all layers
    attentions = outputs.attentions
    
    if attentions is None or len(attentions) == 0:
        print("ERROR: Model did not output attention weights!")
        # Fallback to simple gradient-based visualization
        return generate_simple_heatmap(pixel_values_tensor, original_image)
    
    # Tuple of [batch, num_heads, seq_len, seq_len]
    print(f"Number of attention layers: {len(attentions)}")
    print(f"Attention shape: {attentions[0].shape}")
    
    # Attention Rollout: progressively multiply attention matrices
    batch_size = attentions[0].shape[0]
    num_tokens = attentions[0].shape[-1]
    
    # Average attention heads
    attn_mat = torch.stack([attn.mean(dim=1) for attn in attentions])  # [num_layers, batch, seq_len, seq_len]
    
    # Add residual connections (identity matrix)
    residual_attn = torch.eye(num_tokens).unsqueeze(0).unsqueeze(0)  # [1, 1, seq_len, seq_len]
    attn_mat = attn_mat + residual_attn
    
    # Renormalize
    attn_mat = attn_mat / attn_mat.sum(dim=-1, keepdim=True)
    
    # Multiply attention matrices across layers (rollout)
    joint_attentions = attn_mat[0]  # Start with first layer
    for i in range(1, len(attn_mat)):
        joint_attentions = torch.matmul(attn_mat[i], joint_attentions)
    
    # Get attention for CLS token (first token) to all patches
    cls_attention = joint_attentions[0, 0, 1:]  # [num_patches]
    
    print(f"CLS attention - min: {cls_attention.min():.6f}, max: {cls_attention.max():.6f}, mean: {cls_attention.mean():.6f}")
    
    # Reshape to spatial grid (14x14 for ViT)
    size = int(cls_attention.shape[0] ** 0.5)
    attention_map = cls_attention.reshape(size, size).cpu().numpy()
    
    print(f"Attention map - shape: {attention_map.shape}, min: {attention_map.min():.6f}, max: {attention_map.max():.6f}, std: {attention_map.std():.6f}")
    
    # Resize to original image size
    attention_resized = cv2.resize(attention_map, (original_image.width, original_image.height), interpolation=cv2.INTER_CUBIC)
    
    # Apply moderate blur for smoothness
    attention_resized = cv2.GaussianBlur(attention_resized, (25, 25), 0)
    
    # Normalize to 0-1
    attention_resized = (attention_resized - attention_resized.min()) / (attention_resized.max() - attention_resized.min() + 1e-8)
    
    print(f"After processing - min: {attention_resized.min():.3f}, max: {attention_resized.max():.3f}, std: {attention_resized.std():.3f}")
    
    # Convert to heatmap
    heatmap = np.uint8(255 * attention_resized)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    
    # Overlay on original image
    original_array = np.array(original_image)
    superimposed = cv2.addWeighted(original_array, 0.6, heatmap, 0.4, 0)
    
    return superimposed


def generate_simple_heatmap(pixel_values_tensor, original_image):
    """Fallback: Generate simple gradient-based heatmap"""
    print("Using simple gradient-based heatmap...")
    
    # Enable gradients
    pixel_values_tensor.requires_grad_(True)
    
    # Forward pass
    outputs = image_model(pixel_values=pixel_values_tensor)
    
    # Get predicted class
    pred_class = outputs.logits.argmax(dim=1).item()
    
    # Backward pass
    image_model.zero_grad()
    outputs.logits[0, pred_class].backward()
    
    # Get gradients
    gradients = pixel_values_tensor.grad.abs()  # [1, 3, 224, 224]
    
    # Average across channels
    saliency = gradients.squeeze(0).mean(dim=0).cpu().numpy()  # [224, 224]
    
    print(f"Saliency - min: {saliency.min():.6f}, max: {saliency.max():.6f}, std: {saliency.std():.6f}")
    
    # Normalize
    saliency = (saliency - saliency.min()) / (saliency.max() - saliency.min() + 1e-8)
    
    # Resize to original image size
    saliency_resized = cv2.resize(saliency, (original_image.width, original_image.height), interpolation=cv2.INTER_CUBIC)
    
    # Apply blur
    saliency_resized = cv2.GaussianBlur(saliency_resized, (25, 25), 0)
    
    # Convert to heatmap
    heatmap = np.uint8(255 * saliency_resized)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    
    # Overlay
    original_array = np.array(original_image)
    superimposed = cv2.addWeighted(original_array, 0.6, heatmap, 0.4, 0)
    
    return superimposed


def image_to_base64(img_array):
    """Converts a numpy image array to a base64 string for API response."""
    img = Image.fromarray(img_array)
    buffered = io.BytesIO()
    img.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')


 
 
# API Endpoints

# Health Check Endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Image Prediction Endpoint using ViT with Grad-CAM
@app.post("/predict_image")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    metadata = {"filename": file.filename, "width": image.width, "height": image.height}
    original_image = image.convert("RGB")

    # Preprocess image for prediction
    inputs = image_processor(images=original_image, return_tensors="pt")
    
    # Get prediction (no gradients needed for this)
    with torch.no_grad():
        outputs = image_model(**inputs)
    
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=-1).flatten()
    predicted_class_idx = logits.argmax(-1).item()
    predicted_class = image_model.config.id2label[predicted_class_idx]
    confidence = probabilities[predicted_class_idx].item()

    # Generate Attention Rollout heatmap (better for ViT than Grad-CAM)
    inputs_for_heatmap = image_processor(images=original_image, return_tensors="pt")
    heatmap_overlay = generate_attention_heatmap(inputs_for_heatmap['pixel_values'], original_image, predicted_class_idx)
    heatmap_base64 = image_to_base64(heatmap_overlay)

    prediction_results = {
        "predicted_class": predicted_class.upper(),
        "confidence_str": f"{confidence:.2%}",
        "type": "image"
    }

    llm_explanation = await get_llm_explanation(prediction_results)

    return {
        "metadata": metadata,
        "prediction": prediction_results,
        "gradcam_heatmap": f"data:image/jpeg;base64,{heatmap_base64}",
        "explanation": llm_explanation
    }


# Video Prediction Endpoint using GenConViT
@app.post("/predict_video")
async def predict_video(file: UploadFile = File(...)):
    # Save the uploaded video to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
        tmp.write(await file.read())
        temp_video_path = tmp.name

    try:
        print(f"\n{'='*60}")
        print(f"Processing video: {file.filename}")
        print(f"{'='*60}")
        
        # Extract faces from video frames (default 15 frames)
        num_frames = 15
        df = df_face(temp_video_path, num_frames)
        
        if len(df) == 0:
            raise HTTPException(
                status_code=400,
                detail="No face detected in the video. Please upload a video with a clear face visible."
            )
        
        print(f"✓ Extracted {len(df)} frames with faces")
        
        # Run prediction using the pre-loaded model
        print(f"\n{'─'*60}")
        print(f"🔍 ENSEMBLE PREDICTION (Both Networks Active)")
        print(f"{'─'*60}")
        y, y_val = pred_vid(df, video_model)
        
        predicted_class = real_or_fake(y)
        confidence = y_val
        
        print(f"{'─'*60}")
        print(f"✓ Final Prediction: {predicted_class} (confidence: {confidence:.2%})")
        print(f"{'─'*60}\n")
        
        # Generate LLM explanation
        prediction_results = {
            "predicted_class": predicted_class,
            "confidence_str": f"{confidence:.2%}",
            "type" : "video"
        }

        llm_explanation = await get_llm_explanation(prediction_results)

        return {
            "metadata": {"filename": file.filename},
            "prediction": prediction_results,
            "explanation": llm_explanation
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error processing video: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500, 
            detail=f"Video processing failed: {str(e)}"
        )

    finally:
        # Clean up the temporary video file
        if os.path.exists(temp_video_path):
            os.unlink(temp_video_path)
            print(f"✓ Cleaned up temporary file")
        print(f"{'='*60}\n")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)