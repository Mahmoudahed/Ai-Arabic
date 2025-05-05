'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LogoConfig } from '../types/indexs';
import LogoPreview from './LogoPreview';
import ControlPanel from './ControlPanel';
import { abbreviateText } from '../utils/textUtils';
import { getColorFromChar, getRandomColor } from '../utils/colorUtils';

const defaultConfig: LogoConfig = {
  text: '',
  abbreviation: '',
  backgroundColor: '#6366F1', // Indigo
  fontColor: '#FFFFFF',
  fontSize: 36,
  fontWeight: '700',
  shape: 'circle',
  shapeSize: 120,
  borderRadius: 8,
  borderWidth: 0,
  borderColor: '#000000',
  shadow: false,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowBlur: 10,
  rotation: 0,
  symbol: 'none',
  symbolColor: '#FFFFFF',
  symbolSize: 24,
  symbolPosition: 'center',
};

const LogoGenerator: React.FC = () => {
  const [config, setConfig] = useState<LogoConfig>({ ...defaultConfig });
  const logoRef = useRef<HTMLDivElement>(null);

  // Update config when text changes
  useEffect(() => {
    if (config.text) {
      // Generate abbreviation based on text length
      const abbreviation = abbreviateText(config.text);
      
      // Set background color based on first character
      const firstChar = config.text[0] || '';
      const backgroundColor = getColorFromChar(firstChar);
      
      // Generate font color based on last character
      const lastChar = config.text[config.text.length - 1] || '';
      const fontColor = getColorFromChar(lastChar);
      
      setConfig((prev) => ({
        ...prev,
        abbreviation,
        backgroundColor,
        fontColor,
      }));
    }
  }, [config.text]);

  // Handle config changes
  const handleConfigChange = (newConfig: Partial<LogoConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Export logo as PNG
  const handleExport = () => {
    if (!logoRef.current) return;
    
    const logoElement = logoRef.current.querySelector('.logo-container');
    if (!logoElement) return;
    
    // Use html2canvas or similar library to capture the logo
    // For simplicity, we'll just alert a message
    alert('Export feature would save the logo as PNG. In a production app, this would use html2canvas or a similar library.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-blue-600 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Logo Generator</h1>
          <p className="mt-2 text-gray-600">
            Create a beautiful, customized logo for your brand
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Logo Preview */}
            <div 
              ref={logoRef}
              className="col-span-3 p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
            >
              <div className="logo-container" style={{
                filter: config.shadow ? `drop-shadow(0 4px ${config.shadowBlur}px ${config.shadowColor})` : 'none',
                transition: 'all 0.3s ease',
              }}>
                <LogoPreview config={config} />
              </div>
            </div>
            
            {/* Controls */}
            <div className="col-span-2 border-t lg:border-t-0 lg:border-l border-gray-200">
              <ControlPanel
                config={config}
                onConfigChange={handleConfigChange}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;