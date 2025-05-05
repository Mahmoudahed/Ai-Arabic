import React from 'react';
import { ColorOption } from '../types/indexs';
import { colorPalettes } from '../utils/colorUtils';

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
  label: string;
  palette?: ColorOption[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onChange,
  label,
  palette = Object.values(colorPalettes.vibrant).map((value, index) => ({ 
    name: `Color ${index + 1}`, 
    value 
  })),
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="grid grid-cols-5 gap-2">
        {palette.map((color, index) => (
          <button
            key={index}
            type="button"
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color.value
                ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-500'
                : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200`}
            style={{ backgroundColor: color.value }}
            onClick={() => onChange(color.value)}
            title={color.name}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <span className="ml-2 text-xs text-gray-500">Custom color</span>
      </div>
    </div>
  );
};

export default ColorPicker;