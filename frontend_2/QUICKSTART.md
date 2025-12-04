# Quick Start Commands

## First Time Setup
```powershell
# Navigate to frontend_2
cd c:\Users\bhada\OneDrive\Desktop\df_knight\frontend_2

# Install dependencies
npm install

# Start development server
npm run dev
```

## Subsequent Runs
```powershell
# Just start the dev server
npm run dev
```

## Open in Browser
http://localhost:3000

## Backend Must Be Running
Make sure your FastAPI backend is running on:
http://127.0.0.1:8000

Start backend with:
```powershell
cd c:\Users\bhada\OneDrive\Desktop\df_knight\backend
uvicorn main:app --reload
```

## Troubleshooting

### Port 3000 in use?
```powershell
npm run dev -- -p 3001
```

### Dependencies not installing?
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Changes not reflecting?
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```
