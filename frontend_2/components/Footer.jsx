'use client';

import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiShield } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FiShield className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold">AI Deepfake Detector</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced AI-powered deepfake detection for images and videos. Protecting truth in the digital age.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiGithub className="text-2xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="text-2xl" />
              </a>
              <a href="mailto:contact@deepfakedetector.com" className="text-gray-400 hover:text-white transition-colors">
                <FiMail className="text-2xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Start Detection
                </Link>
              </li>
              <li>
                <a href="#learn-more" className="hover:text-white transition-colors">
                  About Deepfakes
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Technology</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Vision Transformer (ViT)</li>
              <li>GenConViT</li>
              <li>Grad-CAM</li>
              <li>Next.js 14</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 AI Deepfake Detector. Built with Next.js and FastAPI.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
