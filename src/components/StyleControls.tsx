'use client';

import React from 'react';
import { CircleDashed, Circle, Square, Triangle, Hexagon, Star, Zap, Clock, Palette } from 'lucide-react';
import { MonogramStyle } from './IconogramLogo';

interface StyleControlsProps {
  style: MonogramStyle;
  onStyleChange: (style: MonogramStyle) => void;
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  secondaryColor: string;
  onSecondaryColorChange: (color: string) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  spacing: number;
  onSpacingChange: (spacing: number) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({
  style,
  onStyleChange,
  primaryColor,
  onPrimaryColorChange,
  secondaryColor,
  onSecondaryColorChange,
  scale,
  onScaleChange,
  rotation,
  onRotationChange,
  spacing,
  onSpacingChange
}) => {
  // Style options with icons and names
  const styleOptions: Array<{id: MonogramStyle; icon: React.ElementType; label: string}> = [
    { id: 'minimalist', icon: Circle, label: 'Minimalist' },
    { id: 'geometric', icon: Hexagon, label: 'Geometric' },
    { id: 'duotone', icon: CircleDashed, label: 'Duotone' },
    { id: 'brutalist', icon: Square, label: 'Brutalist' },
    { id: 'neon', icon: Zap, label: 'Neon' },
    { id: 'glitch', icon: Triangle, label: 'Glitch' },
    { id: 'retro', icon: Clock, label: 'Retro' },
    { id: 'artdeco', icon: Star, label: 'Art Deco' },
  ];
  
  // Color palettes for quick selection
  const colorPalettes = [
    { primary: '#3B82F6', secondary: '#F97316' }, // Blue/Orange
    { primary: '#8B5CF6', secondary: '#EC4899' }, // Purple/Pink
    { primary: '#10B981', secondary: '#F59E0B' }, // Green/Yellow
    { primary: '#F43F5E', secondary: '#8B5CF6' }, // Red/Purple
    { primary: '#06B6D4', secondary: '#8B5CF6' }, // Cyan/Purple
    { primary: '#000000', secondary: '#F97316' }, // Black/Orange
    { primary: '#1E40AF', secondary: '#FFFFFF' }, // Navy/White
    { primary: '#DFBD69', secondary: '#1E1E1E' }, // Gold/Black
  ];
  
  return (
    <div className="space-y-6">
      {/* Style Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Style
        </label>
        <div className="grid grid-cols-4 gap-2">
          {styleOptions.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onStyleChange(id)}
              className={`flex flex-col items-center p-3 border rounded-lg ${
                style === id
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Color Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Colors
        </label>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Primary</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="block w-full h-10 rounded-md border-gray-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Secondary</label>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              className="block w-full h-10 rounded-md border-gray-300 cursor-pointer"
            />
          </div>
        </div>
        
        {/* Color Palettes */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {colorPalettes.map((palette, index) => (
            <button
              key={index}
              onClick={() => {
                onPrimaryColorChange(palette.primary);
                onSecondaryColorChange(palette.secondary);
              }}
              className="flex rounded-full overflow-hidden border border-gray-200 w-8 h-8 hover:ring-2 hover:ring-blue-300 transition-all"
              title="Apply color palette"
            >
              <div className="w-1/2 h-full" style={{ backgroundColor: palette.primary }}></div>
              <div className="w-1/2 h-full" style={{ backgroundColor: palette.secondary }}></div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Sliders for transformation controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Scale
            </label>
            <span className="text-xs text-gray-500">{scale.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
        
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Rotation
            </label>
            <span className="text-xs text-gray-500">{rotation}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={rotation}
            onChange={(e) => onRotationChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
        
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Letter Spacing
            </label>
            <span className="text-xs text-gray-500">{spacing}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="100"
            step="5"
            value={spacing}
            onChange={(e) => onSpacingChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleControls; 