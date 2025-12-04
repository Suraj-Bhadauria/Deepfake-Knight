# 🛡️ DF Knight - AI-Powered Deepfake Detector

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![Next.js](https://img.shields.io/badge/next.js-14.2.0-black)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-green)

A comprehensive, full-stack deepfake detection application that leverages cutting-edge AI models to identify manipulated images and videos. Built with FastAPI backend and Next.js frontend, DF Knight provides an intuitive interface for analyzing media authenticity with detailed AI-powered explanations.

## ✨ Features

- 🖼️ **Image Deepfake Detection**: Uses Vision Transformer (ViT) model with attention-based visualization
- 🎥 **Video Deepfake Detection**: Employs GenConViT (Generative Convolutional Vision Transformer) for robust video analysis
- 🔍 **Visual Explanations**: Grad-CAM and attention heatmaps to highlight manipulated regions
- 🤖 **AI-Powered Insights**: Natural language explanations using Google Gemini AI
- 📊 **Comprehensive Analysis**: Confidence scores, prediction results, and detailed reports
- 📄 **PDF Export**: Generate downloadable PDF reports of analysis results
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- ⚡ **Real-time Processing**: Fast inference with GPU acceleration support

## 🏗️ Architecture

### Backend (`/backend`)
- **Framework**: FastAPI with CORS middleware
- **AI Models**:
  - **Image Detection**: Vision Transformer (ViT) for image classification
  - **Video Detection**: GenConViT (Encoder-Decoder architecture)
- **LLM Integration**: Google Gemini via LangChain for natural language explanations
- **Processing**: OpenCV, PIL for media processing
- **Face Detection**: Face Recognition library for video frame analysis

### Frontend (`/frontend_2`)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: Modular React components for upload, analysis, and results
- **Features**: PDF generation (jsPDF + html2canvas), real-time API integration

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16.x or higher
- npm or yarn
- CUDA-compatible GPU (optional, for faster inference)
- Google Gemini API key

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/df_knight.git
cd df_knight
```

### Step 2: Backend Setup

#### 2.1 Create Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### 2.2 Install Dependencies

```bash
pip install -r requirements.txt
```

#### 2.3 Download AI Models

The application requires two pre-trained models that are not included in the repository due to their size:

**a) GenConViT Model (for Video Detection)**

The GenConViT model weights need to be placed in `backend/GenConViT/weight/`:

- **Model**: GenConViT Encoder-Decoder (ED) and Variational Autoencoder (VAE)
- **Source**: [erprogs/GenConViT](https://github.com/erprogs/GenConViT) - Official implementation
- **Paper**: [Deepfake Video Detection Using Generative Convolutional Vision Transformer](https://www.mdpi.com/2076-3417/15/12/6622)

Download the pretrained weights:
```bash
# Navigate to the weight directory
cd GenConViT/weight

# Download the models (replace with actual download links from the repository)
# You can find pre-trained weights in the original GenConViT repository
# or train your own using the provided training scripts
```

Required files:
- `genconvit_ed_inference.pth` - Encoder-Decoder model
- `genconvit_vae_inference.pth` - Variational Autoencoder model (optional for lower memory usage)

**Alternative**: You can train your own GenConViT model using the sample data:
```bash
python GenConViT/train.py -d GenConViT/sample_train_data -m ed -e 50 -b 32
```

**b) Vision Transformer Model (for Image Detection)**

The ViT model should be placed in `backend/image_model/`:

- **Model**: Vision Transformer (ViT) fine-tuned for deepfake detection
- **Architecture**: Standard ViT-Base or ViT-Large
- **Source**: Hugging Face Transformers compatible model

You can use a pre-trained ViT model from Hugging Face:

```bash
# Example: Download a ViT model for image classification
# Replace with your specific model or use a fine-tuned deepfake detection ViT
```

Required files in `image_model/`:
- `config.json` - Model configuration
- `model.safetensors` or `pytorch_model.bin` - Model weights
- `preprocessor_config.json` - Image preprocessing configuration

**Recommended Models**:
- [google/vit-base-patch16-224](https://huggingface.co/google/vit-base-patch16-224)
- Fine-tune on deepfake datasets for better results

#### 2.4 Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your Google Gemini API key:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Step 3: Frontend Setup

```bash
cd ../frontend_2
npm install
```

## 🎯 Usage

### Running the Application

#### 1. Start the Backend Server

```bash
cd backend
# Activate virtual environment if not already activated
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Run FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

#### 2. Start the Frontend Development Server

In a new terminal:

```bash
cd frontend_2
npm run dev
```

The web application will be available at `http://localhost:3000`

### Using the Application

1. **Navigate to the Dashboard**: Click "Get Started" or go to `/dashboard`
2. **Select Media Type**: Choose between Image or Video analysis
3. **Upload Media**: Drag and drop or click to upload your file
4. **Analyze**: Click the analyze button to process the media
5. **View Results**: 
   - See the prediction (FAKE/REAL)
   - Review confidence scores
   - Examine visual heatmaps
   - Read AI-generated explanation
6. **Export Report**: Download a PDF report of the analysis

## 🧪 API Endpoints

### Image Analysis
```
POST /predict/image
Content-Type: multipart/form-data
Body: file (image file)

Response:
{
  "prediction": "FAKE" | "REAL",
  "confidence": 0.95,
  "heatmap_base64": "base64_encoded_image",
  "explanation": "AI-generated explanation..."
}
```

### Video Analysis
```
POST /predict/video
Content-Type: multipart/form-data
Body: file (video file)

Response:
{
  "prediction": "FAKE" | "REAL",
  "confidence": 0.87,
  "explanation": "AI-generated explanation...",
  "frames_analyzed": 16
}
```

## 🧠 Models & Technologies

### AI Models

1. **Vision Transformer (ViT)**
   - Purpose: Image deepfake detection
   - Architecture: Transformer-based vision model
   - Features: Self-attention mechanism, patch-based processing
   - Visualization: Attention rollout heatmaps

2. **GenConViT (Generative Convolutional Vision Transformer)**
   - Purpose: Video deepfake detection
   - Architecture: Hybrid ConvNeXt + Swin Transformer with Autoencoder/VAE
   - Paper: [MDPI Applied Sciences](https://www.mdpi.com/2076-3417/15/12/6622)
   - GitHub: [erprogs/GenConViT](https://github.com/erprogs/GenConViT)
   - Features: Latent space analysis, visual artifact detection
   - Performance: 95.8% accuracy, 99.3% AUC across multiple datasets

3. **Google Gemini (via LangChain)**
   - Purpose: Natural language explanation generation
   - Model: Gemini 2.5 Flash
   - Features: Contextual understanding, user-friendly explanations

### Tech Stack

**Backend:**
- FastAPI - Modern Python web framework
- PyTorch - Deep learning framework
- Transformers (Hugging Face) - Model implementation
- OpenCV - Video/image processing
- LangChain - LLM integration
- Face Recognition - Face detection in videos

**Frontend:**
- Next.js 14 - React framework with App Router
- Tailwind CSS - Utility-first CSS framework
- React Icons - Icon library
- jsPDF + html2canvas - PDF generation

## 📊 Model Performance

### GenConViT Results (from paper)

| Dataset | Accuracy | F1 Score | AUC |
|---------|----------|----------|-----|
| DFDC | 94.2% | 94.1% | 98.9% |
| FaceForensics++ | 97.8% | 97.7% | 99.5% |
| DeepfakeTIMIT | 96.3% | 96.2% | 99.4% |
| Celeb-DF v2 | 95.0% | 94.9% | 99.3% |
| **Average** | **95.8%** | **95.7%** | **99.3%** |

## 🛠️ Development

### Project Structure

```
df_knight/
├── backend/
│   ├── main.py                    # FastAPI application
│   ├── requirements.txt           # Python dependencies
│   ├── GenConViT/                 # Video detection model
│   │   ├── model/                 # Model implementations
│   │   ├── dataset/               # Data loaders
│   │   ├── train/                 # Training scripts
│   │   └── weight/                # Model weights (gitignored)
│   └── image_model/               # Image detection model (gitignored)
│       ├── config.json
│       ├── model.safetensors
│       └── preprocessor_config.json
├── frontend_2/
│   ├── app/                       # Next.js pages
│   │   ├── page.js               # Landing page
│   │   └── dashboard/            # Dashboard
│   ├── components/               # React components
│   │   ├── ImageUploader.jsx
│   │   ├── VideoUploader.jsx
│   │   ├── MediaSelector.jsx
│   │   └── ResultDisplay.jsx
│   ├── lib/                      # Utilities
│   └── public/                   # Static assets
└── README.md
```

### Training Custom Models

**GenConViT Video Model:**

```bash
cd backend/GenConViT

# Train Encoder-Decoder variant
python train.py -d /path/to/training/data -m ed -e 50 -b 32

# Train VAE variant
python train.py -d /path/to/training/data -m vae -e 50 -b 32
```

Training data structure:
```
training_data/
├── train/
│   ├── fake/
│   └── real/
├── valid/
│   ├── fake/
│   └── real/
└── test/
    ├── fake/
    └── real/
```

## 🐛 Troubleshooting

### Common Issues

**1. CUDA Out of Memory**
- Solution: The application automatically falls back to CPU if GPU memory is insufficient
- For GenConViT, the app uses only the ED model by default (lighter)
- Reduce batch size or use CPU mode

**2. Model Files Not Found**
- Ensure models are downloaded and placed in correct directories
- Check file names match exactly: `genconvit_ed_inference.pth`, `genconvit_vae_inference.pth`

**3. Face Detection Fails in Video**
- Install dlib properly: `pip install dlib`
- Ensure video has clear, front-facing faces
- Check video format compatibility

**4. Frontend Can't Connect to Backend**
- Verify backend is running on port 8000
- Check CORS settings in `main.py`
- Ensure no firewall blocking localhost connections

**5. Gemini API Errors**
- Verify API key in `.env` file
- Check API quota and rate limits
- Ensure internet connection is active

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

### Third-Party Licenses

- **GenConViT**: Original implementation by [Deressa Wodajo et al.](https://github.com/erprogs/GenConViT)
- **Vision Transformer**: Hugging Face Transformers library
- **Other dependencies**: See respective package licenses

## 🙏 Acknowledgments

- **GenConViT Model**: Deressa Wodajo, Hannes Mareen, Peter Lambert, Solomon Atnafu, Zahid Akhtar, Glenn Van Wallendael
  - Paper: [Deepfake Video Detection Using Generative Convolutional Vision Transformer](https://www.mdpi.com/2076-3417/15/12/6622)
  - GitHub: [erprogs/GenConViT](https://github.com/erprogs/GenConViT)

## 🔗 References

- [GenConViT Paper (MDPI)](https://www.mdpi.com/2076-3417/15/12/6622)
- [GenConViT GitHub](https://github.com/erprogs/GenConViT)
- [Vision Transformers](https://arxiv.org/abs/2010.11929)
- [FaceForensics++ Dataset](https://github.com/ondyari/FaceForensics)
- [Google Gemini AI](https://ai.google.dev/)

## 📧 Contact

For questions, issues, or contributions, please open an issue on GitHub.

## 🚀 Future Enhancements

- [ ] Real-time video stream analysis
- [ ] Batch processing support
- [ ] Additional model architectures
- [ ] Multi-language support
- [ ] Mobile application
- [ ] Cloud deployment guides
- [ ] API authentication
- [ ] Webhook notifications

---

**Built with ❤️ for a safer digital world**
