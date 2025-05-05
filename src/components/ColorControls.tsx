'use client';

import React, { useState } from 'react';
import { Palette, PaintBucket, Droplet, Sliders } from 'lucide-react';
import { IconElement } from './IconForge';

interface ColorControlsProps {
  background: string;
  onBackgroundChange: (color: string) => void;
  palette: string[];
  onPaletteChange: (palette: string[]) => void;
  selectedElement: IconElement | undefined;
  onElementUpdate: (updates: Partial<IconElement>) => void;
}

const ColorControls: React.FC<ColorControlsProps> = ({
  background,
  onBackgroundChange,
  palette,
  onPaletteChange,
  selectedElement,
  onElementUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'background' | 'palette' | 'element'>('background');
  
  // Predefined color palettes
  const predefinedPalettes = [
    // Vibrant
    ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#6366F1'],
    // Pastel
    ['#93C5FD', '#F9A8D4', '#A7F3D0', '#FDE68A', '#DDD6FE'],
    // Monochrome
    ['#0F172A', '#1E293B', '#334155', '#64748B', '#94A3B8'],
    // Earth tones
    ['#92400E', '#A16207', '#65A30D', '#166534', '#1E3A8A'],
    // Neon
    ['#FE0000', '#00FF00', '#FE00FE', '#00FFFF', '#FFFF00'],
    // Minimal
    ['#000000', '#FFFFFF', '#F3F4F6', '#D1D5DB', '#4B5563'],
  ];
  
  // Helper to update the palette
  const updatePalette = (index: number, color: string) => {
    const newPalette = [...palette];
    newPalette[index] = color;
    onPaletteChange(newPalette);
  };
  
  // Helper to apply a predefined palette
  const applyPredefinedPalette = (colors: string[]) => {
    onPaletteChange(colors);
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex border-b mb-4">
        <button
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-[2px] ${
            activeTab === 'background'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('background')}
        >
          <PaintBucket className="h-4 w-4 inline-block mr-1" />
          Background
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-[2px] ${
            activeTab === 'palette'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('palette')}
        >
          <Palette className="h-4 w-4 inline-block mr-1" />
          Palette
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-[2px] ${
            activeTab === 'element'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('element')}
          disabled={!selectedElement}
        >
          <Sliders className="h-4 w-4 inline-block mr-1" />
          Element
        </button>
      </div>
      
      {/* Background controls */}
      {activeTab === 'background' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <div className="flex items-center">
              <input
                type="color"
                value={background}
                onChange={(e) => onBackgroundChange(e.target.value)}
                className="h-10 w-20 rounded-md cursor-pointer border-gray-300"
              />
              <span className="ml-2 text-gray-500 text-sm">{background.toUpperCase()}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quick Colors
            </label>
            <div className="flex flex-wrap gap-2">
              {['#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#1F2937', '#000000'].map((color) => (
                <button
                  key={color}
                  onClick={() => onBackgroundChange(color)}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Palette controls */}
      {activeTab === 'palette' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Palette
            </label>
            <div className="grid grid-cols-5 gap-2">
              {palette.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updatePalette(index, e.target.value)}
                    className="h-10 w-full rounded-md cursor-pointer"
                  />
                  <span className="mt-1 text-xs text-gray-500">{color.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Predefined Palettes
            </label>
            <div className="space-y-2">
              {predefinedPalettes.map((colors, index) => (
                <button
                  key={index}
                  onClick={() => applyPredefinedPalette(colors)}
                  className="w-full flex gap-1 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Element controls */}
      {activeTab === 'element' && selectedElement && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fill Color
            </label>
            <div className="flex items-center">
              <input
                type="color"
                value={selectedElement.fill}
                onChange={(e) => onElementUpdate({ fill: e.target.value })}
                className="h-10 w-20 rounded-md cursor-pointer"
              />
              <div className="ml-2 flex flex-wrap gap-1">
                {palette.map((color) => (
                  <button
                    key={color}
                    onClick={() => onElementUpdate({ fill: color })}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stroke Color
            </label>
            <div className="flex items-center">
              <input
                type="color"
                value={selectedElement.stroke}
                onChange={(e) => onElementUpdate({ stroke: e.target.value })}
                className="h-10 w-20 rounded-md cursor-pointer"
              />
              <div className="ml-2 flex flex-wrap gap-1">
                {palette.map((color) => (
                  <button
                    key={color}
                    onClick={() => onElementUpdate({ stroke: color })}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stroke Width: {selectedElement.strokeWidth}px
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={selectedElement.strokeWidth}
              onChange={(e) => onElementUpdate({ strokeWidth: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opacity: {Math.round(selectedElement.opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={selectedElement.opacity}
              onChange={(e) => onElementUpdate({ opacity: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {selectedElement.type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Content
              </label>
              <input
                type="text"
                value={selectedElement.text || ''}
                onChange={(e) => onElementUpdate({ text: e.target.value })}
                maxLength={1}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Single character recommended for icons</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorControls; 