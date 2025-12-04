'use client';

import Link from 'next/link';
import { FiArrowRight, FiShield } from 'react-icons/fi';
import { deepfakeStats } from '@/lib/deepfakeStats';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#2e1e5d] text-white text-center p-8 animate-gradient bg-[length:400%_400%]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <FiShield className="text-yellow-300" />
          <span className="text-sm font-medium">AI-Powered Detection Technology</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Unmask the Digital Illusion.
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
          Beat AI with AI. Our advanced detection platform analyzes images and videos to expose deepfakes with cutting-edge precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 bg-white text-[#2a5298] px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Get Started <FiArrowRight />
          </Link>
          
          <button
            onClick={() => {
              document.getElementById('learn-more')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:bg-white/10"
          >
            Learn More
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <div className="text-4xl font-bold text-yellow-300 mb-2">{deepfakeStats.hero.detectionAccuracy}</div>
            <div className="text-sm text-white/70">Detection Accuracy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <div className="text-4xl font-bold text-green-300 mb-2">{deepfakeStats.hero.analysisTime}</div>
            <div className="text-sm text-white/70">Average Analysis Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <div className="text-4xl font-bold text-blue-300 mb-2">{deepfakeStats.hero.aiModels}</div>
            <div className="text-sm text-white/70">Advanced AI Networks</div>
          </div>
        </div>
      </div>
    </section>
  );
}
