import React from 'react';
import { ShapeType } from '../types/indexs';

interface ShapeSelectorProps {
  selectedShape: ShapeType;
  onChange: (shape: ShapeType) => void;
}

const ShapeSelector: React.FC<ShapeSelectorProps> = ({
  selectedShape,
  onChange,
}) => {
  const shapes: { type: ShapeType; label: string }[] = [
    { type: 'circle', label: 'Circle' },
    { type: 'square', label: 'Square' },
    { type: 'rectangle', label: 'Rectangle' },
    { type: 'rounded', label: 'Rounded' },
    { type: 'pill', label: 'Pill' },
    { type: 'diamond', label: 'Diamond' },
    { type: 'hexagon', label: 'Hexagon' },
    { type: 'triangle', label: 'Triangle' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Logo Shape
      </label>
      <div className="grid grid-cols-4 gap-2">
        {shapes.map(({ type, label }) => (
          <button
            key={type}
            type="button"
            className={`p-2 text-xs rounded ${
              selectedShape === type
                ? 'bg-indigo-100 text-indigo-700 border-indigo-300 border'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
            } transition-all duration-200`}
            onClick={() => onChange(type)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeSelector;