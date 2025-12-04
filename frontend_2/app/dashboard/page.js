'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import VideoUploader from '@/components/VideoUploader';
import MediaSelector from '@/components/MediaSelector';
import ResultDisplay from '@/components/ResultDisplay';

export default function DashboardPage() {
  const [mode, setMode] = useState('image'); // 'image' or 'video'
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [gradcamHeatmap, setGradcamHeatmap] = useState(null);

  // Mode change handler
  const handleModeChange = (newMode) => {
    setMode(newMode);
    handleReset(); // Clear everything when switching modes
  };

  // Reset function
  const handleReset = () => {
    setResult(null);
    setError('');
    setImagePreview(null);
    setVideoPreview(null);
    setGradcamHeatmap(null);
    
    // Clear file inputs
    const imageInput = document.getElementById('file-input');
    const videoInput = document.getElementById('video-file-input');
    if (imageInput) imageInput.value = ''; 
    if (videoInput) videoInput.value = '';
  };

  // Image prediction handler
  const handleImagePredict = async (file) => {
    setIsLoading(true);
    setError('');
    setResult(null);
    setGradcamHeatmap(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict_image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      setGradcamHeatmap(data.gradcam_heatmap);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to connect to server. Please ensure the backend is running.');
      setImagePreview(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Video prediction handler
  const handleVideoPredict = async (file) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict_video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to analyze video. Please ensure the backend is running and the video model is loaded.');
      setVideoPreview(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <h1 className="text-3xl font-bold text-primary-500 mb-2">
            AI Deepfake Detector
          </h1>
          <p className="text-gray-600 text-base">
            Advanced AI-powered deepfake detection for images and videos
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <MediaSelector activeMode={mode} onModeChange={handleModeChange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {mode === 'image' ? (
            <ImageUploader 
              onPredict={handleImagePredict} 
              isLoading={isLoading} 
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          ) : (
            <VideoUploader 
              onPredict={handleVideoPredict} 
              isLoading={isLoading} 
              videoPreview={videoPreview}
              setVideoPreview={setVideoPreview}
            />
          )}
          
          <ResultDisplay 
            result={result} 
            error={error} 
            gradcamHeatmap={gradcamHeatmap}
            onReset={handleReset}
            mediaType={mode}
          />
        </div>
      </main>
    </>
  );
}
