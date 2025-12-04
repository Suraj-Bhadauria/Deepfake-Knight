# ⚡ Quick Start Guide

Get DF Knight up and running in 5 minutes!

## 🚀 Fast Track Setup

### Prerequisites Check
```bash
# Verify Python (3.8+)
python --version

# Verify Node.js (16+)
node --version

# Verify Git
git --version
```

### 1️⃣ Clone & Navigate
```bash
git clone https://github.com/yourusername/df-knight.git
cd df-knight
```

### 2️⃣ Download Models

**Option A: Quick Test (Use base ViT - no training needed)**
```bash
cd backend
python -c "from transformers import ViTForImageClassification, ViTImageProcessor; m = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224'); p = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224'); m.save_pretrained('image_model'); p.save_pretrained('image_model'); print('✓ ViT downloaded!')"
```

**Option B: Full Setup (Includes GenConViT for video)**
- See [MODEL_DOWNLOAD.md](MODEL_DOWNLOAD.md) for GenConViT weights
- Place `.pth` files in `backend/GenConViT/weight/`

### 3️⃣ Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (macOS/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env - add your GOOGLE_API_KEY
```

### 4️⃣ Frontend Setup
```bash
# In new terminal
cd frontend_2
npm install
```

### 5️⃣ Run Application

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend_2
npm run dev
```

### 6️⃣ Access Application
Open browser → `http://localhost:3000`

---

## 🎯 Testing It Out

1. Click **"Get Started"** on homepage
2. Go to **Dashboard**
3. Select **Image** or **Video**
4. Upload a test file
5. Click **Analyze**
6. View results!

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8000 already in use | Use `--port 8001` |
| CUDA out of memory | App auto-switches to CPU |
| Models not found | Check [MODEL_DOWNLOAD.md](MODEL_DOWNLOAD.md) |
| Frontend won't connect | Verify backend is running on port 8000 |
| Gemini API error | Check `.env` has valid `GOOGLE_API_KEY` |

---

## 📚 Full Documentation

- **Complete Setup**: [README.md](README.md)
- **Model Download**: [MODEL_DOWNLOAD.md](MODEL_DOWNLOAD.md)
- **GitHub Deployment**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 💡 Tips

- **GPU Recommended**: For faster video processing
- **API Key**: Get free Gemini key at [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Test Images**: Start with images before videos (faster)
- **Memory**: Close other apps if running on limited RAM

---

**Ready to detect deepfakes! 🛡️**
