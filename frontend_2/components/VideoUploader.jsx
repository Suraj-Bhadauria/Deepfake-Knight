'use client';

import { useState, useRef } from 'react';
import { FiUploadCloud, FiX, FiVideo } from 'react-icons/fi';

export default function VideoUploader({ onPredict, isLoading, videoPreview, setVideoPreview }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
      if (!validVideoTypes.includes(file.type)) {
        alert('Please upload a valid video file (MP4, MOV, AVI, WebM)');
        return;
      }

      // Validate file size (max 100MB)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        alert('File size must be less than 100MB');
        return;
      }

      setSelectedFile(file);
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    const input = document.getElementById('video-file-input');
    if (input) input.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      onPredict(selectedFile);
    }
  };

  return (
    <div className="uploader-card">
      <h2 className="flex items-center gap-2">
        <FiVideo className="inline" /> Upload Video
      </h2>
      <p>Select a video to analyze for deepfake manipulation.</p>
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-primary-500 hover:bg-gray-50 my-6 relative">
          {videoPreview ? (
            <div className="relative max-h-72 w-full">
              <video 
                ref={videoRef}
                src={videoPreview} 
                className="max-w-full max-h-72 rounded-lg object-contain mx-auto bg-black"
                controls
                preload="metadata"
              />
              <button 
                type="button" 
                onClick={handleClear}
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors z-10"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <>
              <FiUploadCloud className="text-5xl text-primary-500 mx-auto mb-4" />
              <p className="mb-2">Drag & drop your video here or</p>
              <input
                type="file"
                id="video-file-input"
                accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo,video/webm"
                onChange={handleFileChange}
                required
                className="block mx-auto mt-2"
              />
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: MP4, MOV, AVI, WebM (Max 100MB)
              </p>
            </>
          )}
        </div>
        <button 
          type="submit" 
          disabled={!selectedFile || isLoading}
          className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-bold text-base transition-colors duration-200 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing Video...' : 'Analyze Video'}
        </button>
      </form>
      {isLoading && (
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
          <p className="text-blue-800 text-center font-medium text-sm">
            ⏳ Processing video frames... This may take a minute.
          </p>
        </div>
      )}
    </div>
  );
}
