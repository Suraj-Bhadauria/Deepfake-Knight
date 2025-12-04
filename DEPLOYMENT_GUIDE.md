# 📤 GitHub Deployment Guide

This guide will walk you through the process of pushing your DF Knight project to GitHub and setting it up for collaboration.

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Prepare Your Repository](#prepare-your-repository)
3. [Create GitHub Repository](#create-github-repository)
4. [Push to GitHub](#push-to-github)
5. [Setup Instructions for Collaborators](#setup-instructions-for-collaborators)
6. [Model Download Instructions](#model-download-instructions)
7. [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before you begin, ensure you have:

- [ ] Git installed on your system
- [ ] GitHub account created
- [ ] Repository cleaned and ready (models excluded via .gitignore)

### Install Git (if not already installed)

**Windows:**
Download from [git-scm.com](https://git-scm.com/download/win)

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/Fedora
```

### Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 📦 Prepare Your Repository

### Step 1: Verify .gitignore is Working

The `.gitignore` file has been created to exclude:
- Model weights (`backend/GenConViT/weight/*.pth`, `backend/image_model/`)
- Virtual environments (`venv/`, `node_modules/`)
- Environment variables (`.env`)
- Build artifacts and cache files

Verify files are ignored:

```bash
cd c:\Users\bhada\OneDrive\Desktop\df_knight

# Check what will be committed
git status
```

You should **NOT** see:
- `backend/venv/`
- `backend/GenConViT/weight/*.pth` files
- `backend/image_model/` contents (except `.gitkeep` if added)
- `frontend_2/node_modules/`
- `.env` files

### Step 2: Create Placeholder for Model Directories

Create `.gitkeep` files to maintain directory structure:

```bash
# For GenConViT weights directory
New-Item -ItemType File -Path "backend\GenConViT\weight\.gitkeep" -Force

# For image model directory
New-Item -ItemType Directory -Path "backend\image_model" -Force
New-Item -ItemType File -Path "backend\image_model\.gitkeep" -Force
```

### Step 3: Add MODEL_DOWNLOAD.md (Optional but Recommended)

Create a file with detailed model download instructions:

```bash
# Create the file
New-Item -ItemType File -Path "MODEL_DOWNLOAD.md" -Force
```

Add content with specific download links and instructions.

## 🌐 Create GitHub Repository

### Option 1: Via GitHub Website (Recommended for Beginners)

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right → "New repository"
3. Configure your repository:
   - **Repository name**: `df-knight` (or your preferred name)
   - **Description**: "AI-powered deepfake detection application using GenConViT and Vision Transformer"
   - **Visibility**: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### Option 2: Via GitHub CLI

```bash
# Install GitHub CLI first
# Windows: winget install --id GitHub.cli
# macOS: brew install gh

# Authenticate
gh auth login

# Create repository
gh repo create df-knight --public --description "AI-powered deepfake detection application"
```

## 🚀 Push to GitHub

### Step 1: Initialize Git Repository (if not already initialized)

```bash
cd c:\Users\bhada\OneDrive\Desktop\df_knight

# Initialize git repository
git init
```

### Step 2: Add All Files

```bash
# Add all files (respecting .gitignore)
git add .

# Verify what's staged
git status
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: DF Knight deepfake detection application

- FastAPI backend with GenConViT and ViT models
- Next.js frontend with modern UI
- Comprehensive README and setup guides
- Model weights excluded (download instructions provided)"
```

### Step 4: Add Remote Repository

Replace `yourusername` with your GitHub username:

```bash
git remote add origin https://github.com/yourusername/df-knight.git

# Verify remote
git remote -v
```

### Step 5: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

If prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your GitHub password)

### Creating a Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "DF Knight Deployment"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)
7. Use this token as your password when pushing

## 👥 Setup Instructions for Collaborators

Share these instructions with anyone who wants to clone and run your project:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/df-knight.git
cd df-knight
```

### 2. Download Model Weights

**GenConViT Model (Video Detection):**

Option A: From GenConViT Official Repository
```bash
# Visit https://github.com/erprogs/GenConViT
# Download pretrained weights or train your own
# Place files in: backend/GenConViT/weight/
```

Option B: Train Your Own (if training data available)
```bash
cd backend/GenConViT
python train.py -d sample_train_data -m ed -e 50 -b 32
python train.py -d sample_train_data -m vae -e 50 -b 32
```

**Vision Transformer Model (Image Detection):**

```bash
# Download from Hugging Face or use a custom trained model
# Place in: backend/image_model/
# Required files: config.json, model.safetensors, preprocessor_config.json
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

### 4. Frontend Setup

```bash
cd ../frontend_2
npm install
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend_2
npm run dev
```

Visit `http://localhost:3000`

## 📥 Model Download Instructions

Since model files are large and not stored in Git, collaborators need to download them separately.

### Creating a MODEL_DOWNLOAD.md File

Create this file in your repository root with specific instructions:

```markdown
# Model Download Instructions

## GenConViT Models (Required for Video Detection)

**Location**: `backend/GenConViT/weight/`

### Method 1: Download from Original Repository
1. Visit [erprogs/GenConViT](https://github.com/erprogs/GenConViT)
2. Look for pretrained model releases
3. Download:
   - `genconvit_ed_inference.pth`
   - `genconvit_vae_inference.pth` (optional)
4. Place in `backend/GenConViT/weight/`

### Method 2: Use Google Drive/Dropbox (Recommended)
If you have trained models, upload them to cloud storage and share the link:

- **Google Drive**: [Your Link Here]
- **Dropbox**: [Your Link Here]

### Method 3: Train Your Own
```bash
cd backend/GenConViT
python train.py -d /path/to/training/data -m ed -e 50 -b 32
```

## Vision Transformer Model (Required for Image Detection)

**Location**: `backend/image_model/`

### Option 1: Download Pretrained ViT
```bash
# Example using Hugging Face
from transformers import ViTForImageClassification, ViTImageProcessor

model = ViTForImageClassification.from_pretrained("google/vit-base-patch16-224")
processor = ViTImageProcessor.from_pretrained("google/vit-base-patch16-224")

model.save_pretrained("backend/image_model")
processor.save_pretrained("backend/image_model")
```

### Option 2: Use Cloud Storage
- **Google Drive**: [Your Link Here]

## Verification

After downloading, verify your directory structure:
```
backend/
├── GenConViT/
│   └── weight/
│       ├── genconvit_ed_inference.pth ✓
│       └── genconvit_vae_inference.pth ✓
└── image_model/
    ├── config.json ✓
    ├── model.safetensors ✓
    └── preprocessor_config.json ✓
```
```

## 🔄 Keeping Your Repository Updated

### Making Changes and Pushing

```bash
# Check status
git status

# Add specific files
git add path/to/file

# Or add all changes
git add .

# Commit with descriptive message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Creating Feature Branches

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push -u origin feature/new-feature

# Create Pull Request on GitHub website
```

## 🔍 Troubleshooting

### Issue: Large files rejected by GitHub

**Error**: `remote: error: File X is 123.45 MB; this exceeds GitHub's file size limit of 100.00 MB`

**Solution**:
1. Ensure `.gitignore` includes the large file
2. Remove from Git cache:
   ```bash
   git rm --cached path/to/large/file
   git commit -m "Remove large file from tracking"
   ```

### Issue: Git LFS (Large File Storage) Required

If you want to store models in Git:

```bash
# Install Git LFS
# Windows: Download from git-lfs.github.com
# macOS: brew install git-lfs
# Linux: sudo apt-get install git-lfs

# Initialize
git lfs install

# Track model files
git lfs track "*.pth"
git lfs track "*.pt"
git lfs track "*.safetensors"

# Commit .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS"

# Add and push models
git add backend/GenConViT/weight/*.pth
git commit -m "Add model weights via LFS"
git push
```

**Note**: Git LFS has storage limits on free plans (1 GB storage, 1 GB bandwidth/month).

### Issue: Authentication Failed

**Solution**: Use Personal Access Token instead of password
1. Generate token (see instructions above)
2. Use as password when prompted
3. Or configure credential helper:
   ```bash
   git config --global credential.helper store
   ```

### Issue: Can't Push - Repository Behind

```bash
# Pull latest changes first
git pull origin main --rebase

# Then push
git push
```

## 📋 Pre-Push Checklist

Before pushing to GitHub, verify:

- [ ] `.gitignore` is working (no large files staged)
- [ ] `.env` file is NOT committed (contains API keys)
- [ ] README.md is comprehensive and accurate
- [ ] All secrets/credentials removed from code
- [ ] Model download instructions are clear
- [ ] Requirements files are up to date
- [ ] Code is tested and working

## 🎯 Next Steps After Pushing

1. **Add Repository Description** on GitHub
2. **Add Topics/Tags**: `deepfake-detection`, `fastapi`, `nextjs`, `computer-vision`, `ai`
3. **Enable Issues** for bug reports and feature requests
4. **Create Releases** for stable versions
5. **Add Contributing Guidelines** (`CONTRIBUTING.md`)
6. **Setup GitHub Actions** for CI/CD (optional)
7. **Add LICENSE file** if not already present

## 📝 Example Repository URL Structure

After pushing, your repository will be available at:
```
https://github.com/yourusername/df-knight
```

Share this URL with collaborators along with:
- Link to this deployment guide
- Model download instructions
- Any additional setup requirements

## 🆘 Getting Help

If you encounter issues:

1. Check GitHub's [documentation](https://docs.github.com)
2. Search for error messages on Stack Overflow
3. Check Git status: `git status`
4. Review commit history: `git log --oneline`
5. Create an issue in your repository

---

**Congratulations! 🎉** Your DF Knight project is now on GitHub and ready for collaboration!
