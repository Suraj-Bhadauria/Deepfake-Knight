'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiFileText,
  FiMaximize,
  FiType,
  FiRefreshCw,
  FiDownload,
} from 'react-icons/fi';

export default function ResultDisplay({ result, error, gradcamHeatmap, onReset, mediaType = 'image' }) {
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const input = reportTemplateRef.current;
    if (!input) return;

    const buttons = input.querySelector('.action-buttons');
    if (buttons) buttons.style.display = 'none';

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      if (buttons) buttons.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalCanvasWidth, finalCanvasHeight;

      if (canvasAspectRatio > pdfAspectRatio) {
        finalCanvasWidth = pdfWidth;
        finalCanvasHeight = pdfWidth / canvasAspectRatio;
      } else {
        finalCanvasHeight = pdfHeight;
        finalCanvasWidth = pdfHeight * canvasAspectRatio;
      }

      const x = (pdfWidth - finalCanvasWidth) / 2;
      const y = (pdfHeight - finalCanvasHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, finalCanvasWidth, finalCanvasHeight);
      pdf.save(`deepfake_report_${result.metadata.filename}.pdf`);
    }).catch(err => {
      if (buttons) buttons.style.display = 'flex';
      console.error("Could not generate PDF", err);
    });
  };

  if (error) {
    return (
      <div className="error-card">
        <FiAlertTriangle className="text-4xl mb-4" /> 
        <p className="mb-4">{error}</p>
        <button 
          onClick={onReset} 
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          <FiRefreshCw /> Try Again
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="placeholder-card">
        <FiFileText className="text-5xl mb-4" />
        <p className="text-lg">Your analysis results will appear here.</p>
      </div>
    );
  }

  const { prediction, metadata, explanation } = result;
  const isFake = prediction.predicted_class === 'FAKE';

  return (
    <div ref={reportTemplateRef} className={`result-card ${isFake ? 'fake' : 'real'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2>Analysis Report</h2>
        <div className="action-buttons flex flex-wrap gap-2">
          <button 
            onClick={onReset} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 font-medium hover:bg-gray-200 transition-colors"
          >
            <FiRefreshCw /> Check New {mediaType === 'image' ? 'Image' : 'Video'}
          </button>
          <button 
            onClick={handleGeneratePdf} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <FiDownload /> Generate Report
          </button>
        </div>
      </div>

      <div className={`flex items-center gap-4 p-6 rounded-xl mb-6 ${
        isFake ? 'bg-red-50 border-2 border-red-300' : 'bg-green-50 border-2 border-green-300'
      }`}>
        {isFake ? (
          <FiAlertTriangle className="text-4xl text-red-600 flex-shrink-0" />
        ) : (
          <FiCheckCircle className="text-4xl text-green-600 flex-shrink-0" />
        )}
        <div className="flex-1">
          <span className={`block text-sm font-medium ${isFake ? 'text-red-700' : 'text-green-700'}`}>
            Prediction
          </span>
          <span className={`block text-3xl font-bold ${isFake ? 'text-red-800' : 'text-green-800'}`}>
            {prediction.predicted_class}
          </span>
        </div>
        <div className={`text-2xl font-bold ${isFake ? 'text-red-800' : 'text-green-800'}`}>
          {prediction.confidence_str}
        </div>
      </div>

      {explanation && (
        <div className={`p-5 rounded-xl border-l-4 mb-6 ${
          isFake 
            ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-500' 
            : 'bg-gradient-to-r from-green-50 to-green-100 border-green-500'
        }`}>
          <h3 className="flex items-center gap-2 mb-3">
            <FiType className={isFake ? 'text-red-600' : 'text-green-600'} />
            AI Explanation
          </h3>
          <p className={`leading-relaxed ${isFake ? 'text-red-900' : 'text-green-900'}`}>
            {explanation}
          </p>
        </div>
      )}

      {gradcamHeatmap && mediaType === 'image' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="mb-3">🔥 Grad-CAM Localization Heatmap</h3>
          <p className="text-gray-600 text-sm mb-4">
            Red/yellow regions indicate areas the AI focused on to make its decision. 
            These highlight potential manipulation zones in fake images.
          </p>
          <img 
            src={gradcamHeatmap} 
            alt="Grad-CAM Heatmap" 
            className="w-full rounded-lg border border-gray-300"
          />
        </div>
      )}

      <h3 className="mt-6">{mediaType === 'image' ? 'Image Metadata' : 'Video Metadata'}</h3>
      <div className="metadata-grid">
        <div className="metadata-item">
          <FiFileText className="metadata-icon" />
          <div>
            <span className="metadata-label">Filename</span>
            <span className="metadata-value">{metadata.filename}</span>
          </div>
        </div>
        {metadata.width && metadata.height && (
          <div className="metadata-item">
            <FiMaximize className="metadata-icon" />
            <div>
              <span className="metadata-label">Dimensions</span>
              <span className="metadata-value">{metadata.width} x {metadata.height} px</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Report generated by AI Deepfake Detector | {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
