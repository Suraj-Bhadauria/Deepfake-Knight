'use client';

import { FiZap, FiLock, FiTrendingUp, FiAward, FiClock, FiDownload } from 'react-icons/fi';
import { deepfakeStats } from '@/lib/deepfakeStats';

export default function WhyChooseUs() {
  const features = deepfakeStats.features.main.map((feature, index) => {
    const icons = [FiZap, FiLock, FiTrendingUp, FiAward, FiClock, FiDownload];
    return {
      icon: icons[index],
      ...feature
    };
  });

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced technology meets user-friendly design. Detect deepfakes with confidence using our comprehensive platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Trusted Detection Technology
          </h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">For Images</h4>
              <div className="space-y-3">
                {deepfakeStats.technology.imageDetection.map((tech, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <div className="font-semibold">{tech.name}</div>
                      <div className="text-sm text-gray-600">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">For Videos</h4>
              <div className="space-y-3">
                {deepfakeStats.technology.videoDetection.map((tech, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <div className="font-semibold">{tech.name}</div>
                      <div className="text-sm text-gray-600">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
