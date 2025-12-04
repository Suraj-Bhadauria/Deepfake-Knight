'use client';

import { FiUpload, FiCpu, FiCheckCircle, FiEye } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    {
      icon: FiUpload,
      title: 'Upload Media',
      description: 'Upload an image or video you want to verify. Supports JPG, PNG, MP4, MOV, and more.',
      color: 'blue',
    },
    {
      icon: FiCpu,
      title: 'AI Analysis',
      description: 'Our Vision Transformer (ViT) and GenConViT models analyze patterns, artifacts, and inconsistencies.',
      color: 'purple',
    },
    {
      icon: FiEye,
      title: 'Visual Heatmap',
      description: 'Grad-CAM technology highlights suspicious regions where the AI detected potential manipulation.',
      color: 'green',
    },
    {
      icon: FiCheckCircle,
      title: 'Get Results',
      description: 'Receive a detailed report with prediction, confidence score, AI explanation, and exportable PDF.',
      color: 'orange',
    },
  ];

  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Our Detection Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system uses state-of-the-art deep learning models to identify manipulated content with exceptional accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[step.color]} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <step.icon className="text-3xl text-white" />
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-10 rounded-2xl shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Powered by Advanced AI</h3>
              <p className="text-lg text-white/90 mb-6">
                We utilize two cutting-edge neural network architectures to ensure maximum detection accuracy:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-2 rounded-lg">🎯</span>
                  <div>
                    <div className="font-bold text-lg">Vision Transformer (ViT)</div>
                    <div className="text-white/80">For image analysis with attention mechanisms</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-2 rounded-lg">🎬</span>
                  <div>
                    <div className="font-bold text-lg">GenConViT</div>
                    <div className="text-white/80">For video deepfake detection across temporal frames</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h4 className="font-bold text-xl mb-4">Detection Capabilities</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Face Swap Detection</span>
                  <span className="font-bold text-green-300">✓ Supported</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expression Manipulation</span>
                  <span className="font-bold text-green-300">✓ Supported</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>AI-Generated Faces</span>
                  <span className="font-bold text-green-300">✓ Supported</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Video Frame Analysis</span>
                  <span className="font-bold text-green-300">✓ Supported</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Grad-CAM Visualization</span>
                  <span className="font-bold text-green-300">✓ Supported</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
