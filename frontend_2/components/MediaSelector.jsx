'use client';

import { FiImage, FiVideo } from 'react-icons/fi';

export default function MediaSelector({ activeMode, onModeChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 p-4 bg-white rounded-xl shadow-md">
      <button
        onClick={() => onModeChange('image')}
        className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold text-base min-w-[180px] transition-all duration-300 ${
          activeMode === 'image'
            ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform hover:-translate-y-0.5'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-500 border-2 border-transparent hover:border-primary-500'
        }`}
      >
        <FiImage className={`text-2xl ${activeMode === 'image' ? 'animate-pulse-slow' : ''}`} />
        <span>Image Analysis</span>
      </button>
      <button
        onClick={() => onModeChange('video')}
        className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold text-base min-w-[180px] transition-all duration-300 ${
          activeMode === 'video'
            ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform hover:-translate-y-0.5'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-500 border-2 border-transparent hover:border-primary-500'
        }`}
      >
        <FiVideo className={`text-2xl ${activeMode === 'video' ? 'animate-pulse-slow' : ''}`} />
        <span>Video Analysis</span>
      </button>
    </div>
  );
}
