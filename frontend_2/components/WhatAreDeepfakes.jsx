'use client';

import { FiAlertTriangle, FiVideo, FiImage, FiCpu } from 'react-icons/fi';
import { deepfakeStats } from '@/lib/deepfakeStats';

export default function WhatAreDeepfakes() {
  return (
    <section id="learn-more" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Are Deepfakes?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deepfakes are synthetic media created using artificial intelligence to manipulate or generate visual and audio content with a high potential to deceive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-8 rounded-2xl shadow-2xl">
              <FiAlertTriangle className="text-5xl mb-4" />
              <h3 className="text-3xl font-bold mb-4">The Threat is Real</h3>
              <p className="text-lg leading-relaxed mb-4">
                In 2024, deepfake technology has advanced to a point where distinguishing real from fake content has become increasingly difficult for the human eye.
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">▸</span>
                  <span>Used in {deepfakeStats.current.campaignUsage} of online disinformation campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">▸</span>
                  <span>Generated at a rate of {deepfakeStats.current.generationSpeed} faster than 2023</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">▸</span>
                  <span>Detected in political, financial, and personal attacks</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <FiVideo className="text-3xl text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Video Manipulation</h4>
                  <p className="text-gray-600">
                    Face-swapping technology that replaces one person's face with another in videos, making it appear as if they said or did something they never did.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <FiImage className="text-3xl text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Image Synthesis</h4>
                  <p className="text-gray-600">
                    AI-generated images of people who don't exist, or altered photos that change facial expressions, age, or entire contexts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <FiCpu className="text-3xl text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Voice Cloning</h4>
                  <p className="text-gray-600">
                    Audio deepfakes that replicate someone's voice with just a few seconds of sample audio, used in scams and impersonations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4">2025 Current Statistics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{deepfakeStats.current.yearOverYearIncrease}</div>
              <div className="text-sm text-white/80">Increase in deepfake content since 2023</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{deepfakeStats.current.globalFraudLosses}</div>
              <div className="text-sm text-white/80">Estimated global fraud losses in 2025</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{deepfakeStats.current.detectionDifficulty}</div>
              <div className="text-sm text-white/80">Of people can't identify deepfakes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{deepfakeStats.current.dailyDetections}</div>
              <div className="text-sm text-white/80">Deepfakes detected daily worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
