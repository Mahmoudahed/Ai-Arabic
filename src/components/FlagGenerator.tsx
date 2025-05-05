'use client';
import React, { useState, useEffect } from 'react';
import { NameInput } from './NameInput';
import { FlagDisplay } from './FlagDisplay';
import { FlagInfo } from './FlagInfo';
import { generateFlagData } from '../utils/flagUtils';

export const FlagGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [flagData, setFlagData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (name) {
      setIsGenerating(true);
      // Small delay for animation effect
      const timer = setTimeout(() => {
        setFlagData(generateFlagData(name));
        setIsGenerating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setFlagData(null);
    }
  }, [name]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Generate Your Personal Flag
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Enter your name and watch as it transforms into a unique flag with colors and symbols 
          that represent each letter of your name.
        </p>
      </div>

      <NameInput name={name} setName={setName} />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <FlagDisplay 
            flagData={flagData} 
            name={name} 
            isGenerating={isGenerating} 
          />
        </div>
        <div className="lg:col-span-2">
          <FlagInfo flagData={flagData} name={name} />
        </div>
      </div>
    </div>
  );
};