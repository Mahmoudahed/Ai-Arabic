import React from 'react';

type Position = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface PositionSelectorProps {
  selectedPosition: Position;
  onChange: (position: Position) => void;
  label: string;
}

const PositionSelector: React.FC<PositionSelectorProps> = ({
  selectedPosition,
  onChange,
  label,
}) => {
  const positions: { value: Position; label: string }[] = [
    { value: 'center', label: 'Center' },
    { value: 'top', label: 'Top' },
    { value: 'right', label: 'Right' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="grid grid-cols-5 gap-1">
        {positions.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`p-1 text-xs rounded ${
              selectedPosition === value
                ? 'bg-indigo-100 text-indigo-700 border-indigo-300 border'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
            } transition-all duration-200`}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PositionSelector;