'use client';

import React from 'react';
import { Download, Share2 } from 'lucide-react';

interface ExportOptionsProps {
  name: string;
  letterTransformations: any[];
  logoStyle: string;
  primaryColor: string;
  secondaryColor: string;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ 
  name, 
  letterTransformations, 
  logoStyle,
  primaryColor,
  secondaryColor
}) => {
  const handleExport = () => {
    // In a real application, this would save the canvas as PNG or SVG
    alert('In a production app, this would export your logo as a high-quality PNG or SVG file.');
  };

  const handleShare = () => {
    // In a real application, this would open sharing options
    alert('In a production app, this would allow you to share your logo via social media or email.');
  };

  const isDisabled = !name || letterTransformations.length === 0;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Export Options</h3>
      
      <div className="flex space-x-4">
        <button 
          type="button"
          className={`flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
            isDisabled 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          } transition-colors duration-200`}
          onClick={handleExport}
          disabled={isDisabled}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Logo
        </button>
        
        <button 
          type="button"
          className={`flex-1 inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md ${
            isDisabled 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          } transition-colors duration-200`}
          onClick={handleShare}
          disabled={isDisabled}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </button>
      </div>
      
      {!isDisabled && (
        <p className="text-xs text-gray-500 italic">
          Files are exported in high resolution for professional use
        </p>
      )}
    </div>
  );
};

export default ExportOptions;