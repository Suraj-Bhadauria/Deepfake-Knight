'use client';

import Link from 'next/link';
import { FiArrowRight, FiShield } from 'react-icons/fi';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-6">
          <FiShield className="text-6xl text-white mx-auto mb-4" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Detect Deepfakes?
        </h2>
        
        <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
          Don't let manipulated content fool you. Start analyzing images and videos right now with our advanced AI-powered detection platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-bold transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Start Detecting Now <FiArrowRight />
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <div className="text-3xl font-bold mb-2">100% Free</div>
            <div className="text-sm text-white/80">No credit card required</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <div className="text-3xl font-bold mb-2">Instant Results</div>
            <div className="text-sm text-white/80">Get answers in seconds</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <div className="text-3xl font-bold mb-2">Privacy Protected</div>
            <div className="text-sm text-white/80">Your data stays secure</div>
          </div>
        </div>
      </div>
    </section>
  );
}
