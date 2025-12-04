# AI Deepfake Detector Frontend (Next.js)

This is a modern Next.js frontend for the AI Deepfake Detector application, built with Next.js 14 App Router and Tailwind CSS.

## Features

- 🎯 Modern Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🖼️ Image deepfake detection with Grad-CAM visualization
- 🎥 Video deepfake detection
- 📊 Detailed analysis reports
- 📄 PDF report generation
- 🔄 Real-time API integration

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Backend Integration

Ensure the FastAPI backend is running on `http://127.0.0.1:8000` before using the application.

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **PDF Generation:** jsPDF + html2canvas
- **Language:** JavaScript (can be migrated to TypeScript)

## Project Structure

```
frontend_2/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Landing page
│   ├── globals.css        # Global styles
│   └── dashboard/
│       └── page.js        # Dashboard page
├── components/
│   ├── ImageUploader.jsx
│   ├── VideoUploader.jsx
│   ├── MediaSelector.jsx
│   └── ResultDisplay.jsx
├── public/                # Static assets
├── package.json
├── tailwind.config.js
└── next.config.mjs
```

## License

MIT
