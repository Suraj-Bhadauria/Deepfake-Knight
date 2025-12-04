# 🚀 Frontend_2 Setup & Installation Guide

## Overview
This is a complete rewrite of the original React frontend using **Next.js 14** with the **App Router** and **Tailwind CSS**. All features from the original frontend have been preserved and enhanced with modern tooling.

---

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- Backend server running on `http://127.0.0.1:8000`

---

## 🛠️ Installation Steps

### 1. Navigate to the frontend_2 directory
```powershell
cd c:\Users\bhada\OneDrive\Desktop\df_knight\frontend_2
```

### 2. Install dependencies
```powershell
npm install
```

This will install:
- Next.js 14
- React 18
- Tailwind CSS 3
- React Icons
- jsPDF & html2canvas for PDF generation
- All necessary dev dependencies

### 3. Create environment file (Optional)
```powershell
Copy-Item .env.example .env.local
```

The default API URL is `http://127.0.0.1:8000`. You can modify this in `.env.local` if needed.

---

## 🏃‍♂️ Running the Application

### Development Mode
```powershell
npm run dev
```

The application will start on **http://localhost:3000**

### Production Build
```powershell
npm run build
npm start
```

---

## 📁 Project Structure

```
frontend_2/
├── app/                          # Next.js App Router
│   ├── layout.js                # Root layout with font and metadata
│   ├── page.js                  # Landing page (/)
│   ├── globals.css              # Global styles + Tailwind directives
│   └── dashboard/
│       └── page.js              # Dashboard page (/dashboard)
│
├── components/                   # React components
│   ├── ImageUploader.jsx        # Image upload & analysis
│   ├── VideoUploader.jsx        # Video upload & analysis
│   ├── MediaSelector.jsx        # Toggle between image/video mode
│   └── ResultDisplay.jsx        # Display results & generate PDF
│
├── lib/                          # Utility functions
│   ├── config.js                # API endpoints configuration
│   └── utils.js                 # Helper functions
│
├── public/                       # Static assets (images, icons, etc.)
│
├── package.json                  # Dependencies and scripts
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── jsconfig.json                # JavaScript path aliases (@/...)
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 🎨 Key Features Implemented

### ✅ All Original Features Preserved
- **Landing Page** with animated gradient background
- **Dashboard** with image and video analysis modes
- **Image Upload** with drag & drop support
- **Video Upload** with file validation (max 100MB)
- **Real-time Analysis** with loading states
- **Grad-CAM Heatmap** visualization for images
- **AI Explanation** powered by LLM
- **PDF Report Generation** with html2canvas
- **Metadata Display** for uploaded files

### 🆕 Modern Enhancements
- **Next.js 14 App Router** for better performance and SEO
- **Tailwind CSS** for maintainable, utility-first styling
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Path Aliases** using `@/` for cleaner imports
- **Better Code Organization** with separation of concerns
- **Environment Variables** for configuration management

---

## 🎯 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.js` | Landing page with hero section |
| `/dashboard` | `app/dashboard/page.js` | Main dashboard with upload/analysis |

---

## 🔧 Configuration Files

### `next.config.mjs`
- Enables React strict mode
- Configures image domains for external images

### `tailwind.config.js`
- Custom color palette (primary blue shades)
- Custom animations (gradient, pulse)
- Content paths for Tailwind purging

### `jsconfig.json`
- Path alias: `@/*` points to root directory
- Enables better import statements

---

## 🎨 Styling Approach

### Tailwind CSS Utilities
Most styling uses Tailwind utility classes directly in JSX:
```jsx
<button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-lg">
  Click Me
</button>
```

### Global Styles
Common component patterns are defined in `app/globals.css`:
- `.uploader-card` - Upload component styling
- `.result-card` - Result display styling
- `.metadata-grid` - Metadata layout

### Custom Theme
Extended Tailwind theme with:
- Primary color palette (50-900 shades)
- Custom animations
- Custom keyframes

---

## 🔌 API Integration

### Backend Endpoints Used
- `POST /predict_image` - Image deepfake detection
- `POST /predict_video` - Video deepfake detection
- `GET /health` - Health check (optional)

### API Configuration
Located in `lib/config.js`:
```javascript
export const API_BASE_URL = 'http://127.0.0.1:8000';
```

Can be overridden with environment variable:
```
NEXT_PUBLIC_API_URL=http://your-backend-url
```

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.5.0",
  "html2canvas": "^1.4.1",
  "jspdf": "^3.0.3"
}
```

### Development Dependencies
```json
{
  "tailwindcss": "^3.4.15",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47",
  "eslint": "^8",
  "eslint-config-next": "14.2.0"
}
```

---

## 🐛 Troubleshooting

### Port 3000 already in use
```powershell
# Kill the process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or use a different port
npm run dev -- -p 3001
```

### Tailwind styles not applying
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Backend connection issues
1. Ensure backend is running: `http://127.0.0.1:8000/health`
2. Check CORS settings in backend `main.py`
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### Module not found errors
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 🔄 Migration from Old Frontend

### Key Differences

| Feature | Old Frontend (Vite + React) | New Frontend (Next.js) |
|---------|----------------------------|------------------------|
| **Router** | React Router DOM | Next.js App Router |
| **Styling** | Vanilla CSS files | Tailwind CSS |
| **File Structure** | `/src` directory | `/app` directory |
| **Imports** | Relative paths | `@/` alias |
| **Server** | Vite dev server | Next.js dev server |
| **Port** | 5173 | 3000 |
| **Build** | `vite build` | `next build` |

### What Stayed the Same
- All component logic and functionality
- API integration patterns
- PDF generation with jsPDF
- React Icons library
- Image/video processing flow

---

## 📝 Development Tips

### 1. Using Path Aliases
```javascript
// Old way
import ImageUploader from '../../../components/ImageUploader';

// New way with @/ alias
import ImageUploader from '@/components/ImageUploader';
```

### 2. Client Components
All components with hooks or browser APIs need `'use client'` directive:
```javascript
'use client';

import { useState } from 'react';

export default function MyComponent() {
  // Component code
}
```

### 3. Tailwind IntelliSense
Install the **Tailwind CSS IntelliSense** VS Code extension for autocomplete.

### 4. Debugging
Next.js provides excellent error messages. Check:
- Browser console for client errors
- Terminal for server errors
- `.next` directory for build artifacts

---

## 🚀 Production Deployment

### Vercel (Recommended)
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build
```powershell
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📄 License
MIT

---

## 🤝 Support

For issues or questions:
1. Check this documentation
2. Review Next.js docs: https://nextjs.org/docs
3. Review Tailwind docs: https://tailwindcss.com/docs

---

## ✨ Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ Test image upload functionality
5. ✅ Test video upload functionality
6. ✅ Generate a PDF report
7. ✅ Build for production: `npm run build`

**Happy coding! 🎉**
