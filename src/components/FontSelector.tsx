'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FontSelectorProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  fontWeight: string;
  setFontWeight: (weight: string) => void;
  letterSpacing: number;
  setLetterSpacing: (spacing: number) => void;
}

const fonts = [
  { value: 'sans', label: 'Sans-Serif', family: 'ui-sans-serif, system-ui, sans-serif' },
  { value: 'serif', label: 'Serif', family: 'ui-serif, Georgia, serif' },
  { value: 'mono', label: 'Monospace', family: 'ui-monospace, SFMono-Regular, monospace' },
  { value: 'display', label: 'Display', family: '"Playfair Display", serif' },
  { value: 'helvetica', label: 'Helvetica', family: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { value: 'futura', label: 'Futura', family: 'Futura, "Trebuchet MS", Arial, sans-serif' },
  { value: 'garamond', label: 'Garamond', family: 'Garamond, Baskerville, "Baskerville Old Face", serif' },
  { value: 'roboto', label: 'Roboto', family: 'Roboto, "Helvetica Neue", Arial, sans-serif' },
  { value: 'montserrat', label: 'Montserrat', family: 'Montserrat, "Helvetica Neue", Arial, sans-serif' },
  { value: 'opensans', label: 'Open Sans', family: '"Open Sans", "Helvetica Neue", Arial, sans-serif' },
];

const weights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
];

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  setSelectedFont,
  fontWeight,
  setFontWeight,
  letterSpacing,
  setLetterSpacing,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getSelectedFontFamily = () => {
    const font = fonts.find(f => f.value === selectedFont);
    return font ? font.family : fonts[0].family;
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-900">Typography</h3>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {fonts.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setSelectedFont(font.value)}
                  className={`px-3 py-2 text-sm rounded-md ${
                    selectedFont === font.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    fontFamily: font.family,
                  }}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Weight
            </label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {weights.map((weight) => (
                <button
                  key={weight.value}
                  onClick={() => setFontWeight(weight.value)}
                  className={`px-3 py-2 text-sm rounded-md ${
                    fontWeight === weight.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    fontWeight: weight.value,
                    fontFamily: getSelectedFontFamily(),
                  }}
                >
                  {weight.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Letter Spacing
              </label>
              <span className="text-sm text-gray-500">{letterSpacing}</span>
            </div>
            <input
              type="range"
              min="-0.05"
              max="0.5"
              step="0.01"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Tight</span>
              <span>Normal</span>
              <span>Wide</span>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-200">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-center" style={{
                fontFamily: getSelectedFontFamily(),
                fontWeight: fontWeight,
                letterSpacing: `${letterSpacing}em`,
              }}>
                Sample Text
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelector; 