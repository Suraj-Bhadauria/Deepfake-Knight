# 📦 Model Download Guide

This guide provides detailed instructions for downloading and setting up the AI models required by DF Knight.

## 🎯 Overview

DF Knight requires two sets of models that are **not included** in this repository due to their size:

1. **GenConViT Models** (~500 MB) - For video deepfake detection
2. **Vision Transformer Model** (~300 MB) - For image deepfake detection

## 📋 Required Models

### 1. GenConViT Models (Video Detection)

**Required Files:**
- `genconvit_ed_inference.pth` (Encoder-Decoder model)
- `genconvit_vae_inference.pth` (Variational Autoencoder model - optional)

**Destination Directory:**
```
backend/GenConViT/weight/
```

---

#### Method 1: Download from Official Repository (Recommended)

The GenConViT model is from the official research implementation:

**Source Repository**: [erprogs/GenConViT](https://github.com/erprogs/GenConViT)  
**Research Paper**: [MDPI Applied Sciences](https://www.mdpi.com/2076-3417/15/12/6622)

**Steps:**

1. Visit the [GenConViT GitHub repository](https://github.com/erprogs/GenConViT)
2. Look for pre-trained model weights in:
   - Releases section
   - Repository README
   - Or contact the authors for model weights

3. Download the `.pth` files

4. Place them in your project:
   ```bash
   # Windows PowerShell
   cd c:\Users\bhada\OneDrive\Desktop\df_knight\backend\GenConViT\weight
   # Place downloaded .pth files here
   ```

**Expected Files:**
```
backend/GenConViT/weight/
├── genconvit_ed_inference.pth      ✓ Required
└── genconvit_vae_inference.pth     ✓ Optional (for better accuracy)
```

---

#### Method 2: Train Your Own Models

If you have access to deepfake training datasets, you can train the models yourself:

**Requirements:**
- GPU with 8GB+ VRAM (recommended)
- Training dataset with real/fake video frames
- ~2-3 days for full training

**Dataset Structure:**
```
training_data/
├── train/
│   ├── fake/      # Fake video frames
│   └── real/      # Real video frames
├── valid/
│   ├── fake/
│   └── real/
└── test/
    ├── fake/
    └── real/
```

**Training Commands:**

```bash
cd backend/GenConViT

# Train Encoder-Decoder (ED) model
python train.py -d /path/to/training_data -m ed -e 50 -b 32

# Train Variational Autoencoder (VAE) model (optional)
python train.py -d /path/to/training_data -m vae -e 50 -b 32
```

**Training Parameters:**
- `-d` : Path to training data
- `-m` : Model variant (`ed` or `vae`)
- `-e` : Number of epochs (50 recommended)
- `-b` : Batch size (32 recommended, adjust based on GPU memory)

---

#### Method 3: Use Cloud Storage (If Available)

If you have already trained models, you can share them via cloud storage:

**Upload To:**
- Google Drive
- Dropbox
- OneDrive
- AWS S3
- Hugging Face Hub

**Share the download link here for collaborators**

---

### 2. Vision Transformer Model (Image Detection)

**Required Files:**
- `config.json`
- `model.safetensors` (or `pytorch_model.bin`)
- `preprocessor_config.json`

**Destination Directory:**
```
backend/image_model/
```

---

#### Method 1: Use Pre-trained ViT from Hugging Face

You can use a standard ViT model and fine-tune it, or use as-is:

**Recommended Models:**
- `google/vit-base-patch16-224` - Base model
- `google/vit-large-patch16-224` - Larger, more accurate
- Any fine-tuned ViT for deepfake detection from Hugging Face

**Download Using Python:**

```python
from transformers import ViTForImageClassification, ViTImageProcessor

# Choose a model
model_name = "google/vit-base-patch16-224"

# Download and save
model = ViTForImageClassification.from_pretrained(model_name)
processor = ViTImageProcessor.from_pretrained(model_name)

# Save to the correct location
model.save_pretrained("backend/image_model")
processor.save_pretrained("backend/image_model")

print("✓ Model downloaded successfully!")
```

**Run this script:**
```bash
cd backend
python -c "from transformers import ViTForImageClassification, ViTImageProcessor; model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224'); processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224'); model.save_pretrained('image_model'); processor.save_pretrained('image_model')"
```

---

#### Method 2: Fine-tune on Deepfake Dataset (Recommended for Best Results)

For optimal performance, fine-tune ViT on a deepfake image dataset:

**Datasets to Use:**
- [FaceForensics++](https://github.com/ondyari/FaceForensics)
- [Celeb-DF](https://github.com/yuezunli/celeb-deepfakeforensics)
- [DFDC (Deepfake Detection Challenge)](https://ai.facebook.com/datasets/dfdc/)

**Fine-tuning Script (Example):**

```python
from transformers import ViTForImageClassification, Trainer, TrainingArguments
from datasets import load_dataset

# Load your dataset
dataset = load_dataset("your_deepfake_dataset")

# Load base model
model = ViTForImageClassification.from_pretrained(
    "google/vit-base-patch16-224",
    num_labels=2,  # FAKE or REAL
    id2label={0: "REAL", 1: "FAKE"},
    label2id={"REAL": 0, "FAKE": 1}
)

# Setup training
training_args = TrainingArguments(
    output_dir="./vit-deepfake-finetuned",
    per_device_train_batch_size=16,
    num_train_epochs=3,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# Train
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
)

trainer.train()

# Save fine-tuned model
model.save_pretrained("backend/image_model")
```

---

#### Method 3: Use Cloud Storage

Share your trained ViT model via cloud storage:

**Upload To:**
- Google Drive
- Hugging Face Hub (recommended for ML models)
- Dropbox

**Share the link here for collaborators**

---

## ✅ Verification

After downloading/installing models, verify your directory structure:

```
backend/
├── GenConViT/
│   └── weight/
│       ├── .gitkeep
│       ├── genconvit_ed_inference.pth      ✓ ~250 MB
│       └── genconvit_vae_inference.pth     ✓ ~250 MB (optional)
│
└── image_model/
    ├── .gitkeep
    ├── config.json                         ✓
    ├── model.safetensors                   ✓ ~300 MB
    └── preprocessor_config.json            ✓
```

### Verification Script

Run this to verify models are loaded correctly:

```bash
cd backend
python -c "
import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'GenConViT'))

# Test GenConViT
from model.config import load_config
from model.pred_func import load_genconvit

config = load_config()
model = load_genconvit(config, net='ed', ed_weight='genconvit_ed_inference', vae_weight=None, fp16=False)
print('✓ GenConViT model loaded successfully!')

# Test ViT
from transformers import ViTForImageClassification, ViTImageProcessor
image_model = ViTForImageClassification.from_pretrained('./image_model')
image_processor = ViTImageProcessor.from_pretrained('./image_model')
print('✓ Vision Transformer model loaded successfully!')

print('\n✅ All models verified and working!')
"
```

## 📊 Model Details

### GenConViT Performance

| Dataset | Accuracy | F1 Score | AUC |
|---------|----------|----------|-----|
| DFDC | 94.2% | 94.1% | 98.9% |
| FaceForensics++ | 97.8% | 97.7% | 99.5% |
| DeepfakeTIMIT | 96.3% | 96.2% | 99.4% |
| Celeb-DF v2 | 95.0% | 94.9% | 99.3% |

**Average**: 95.8% accuracy, 99.3% AUC

### Vision Transformer

- **Architecture**: Transformer-based image classification
- **Input Size**: 224x224 pixels
- **Parameters**: ~86M (base) or ~300M (large)
- **Performance**: Depends on fine-tuning dataset

## 🔧 Troubleshooting

### Issue: Models not loading

**Error**: `FileNotFoundError: [Errno 2] No such file or directory`

**Solution**:
1. Verify files are in correct directories
2. Check file names match exactly (case-sensitive)
3. Ensure files are not corrupted (re-download if needed)

### Issue: Out of Memory

**Error**: `CUDA out of memory`

**Solution**:
1. Use only ED model (skip VAE): Set `vae_weight=None` in code
2. Reduce batch size
3. Use CPU instead of GPU: Set `CUDA_VISIBLE_DEVICES=""`

### Issue: Model version mismatch

**Error**: `RuntimeError: Error(s) in loading state_dict`

**Solution**:
1. Ensure PyTorch versions match
2. Try `torch.load(map_location='cpu')` first
3. Check model architecture compatibility

## 📞 Support

If you encounter issues downloading or setting up models:

1. Check the [GenConViT repository](https://github.com/erprogs/GenConViT) for updates
2. Contact the original authors for pre-trained weights
3. Open an issue in this repository
4. Refer to `DEPLOYMENT_GUIDE.md` for setup help

## 🔗 Resources

- **GenConViT Paper**: https://www.mdpi.com/2076-3417/15/12/6622
- **GenConViT Code**: https://github.com/erprogs/GenConViT
- **Hugging Face ViT**: https://huggingface.co/docs/transformers/model_doc/vit
- **FaceForensics++**: https://github.com/ondyari/FaceForensics
- **DFDC Dataset**: https://ai.facebook.com/datasets/dfdc/

---

**Note**: Due to GitHub's file size limitations (100 MB per file), we cannot include model weights in the repository. Thank you for understanding!
