'use client';

import { useState } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';

export default function ImageUploader({ onPredict, isLoading, imagePreview, setImagePreview }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImagePreview(null);
    const input = document.getElementById('file-input');
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
      <h2>Upload Image</h2>
      <p>Select a portrait image to analyze for deepfake manipulation.</p>
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-primary-500 hover:bg-gray-50 my-6 relative">
          {imagePreview ? (
            <div className="relative max-h-64">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-full max-h-64 rounded-lg object-contain mx-auto"
              />
              <button 
                type="button" 
                onClick={handleClear}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <>
              <FiUploadCloud className="text-5xl text-primary-500 mx-auto mb-4" />
              <p className="mb-2">Drag & drop your file here or</p>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block mx-auto mt-2"
              />
            </>
          )}
        </div>
        <button 
          type="submit" 
          disabled={!selectedFile || isLoading}
          className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-bold text-base transition-colors duration-200 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </form>
    </div>
  );
}
