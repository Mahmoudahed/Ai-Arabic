import React from 'react';
import { SymbolType } from '../types/indexs';
import { Star, Heart, Zap, Check, X, Circle, MoreHorizontal, Waves } from 'lucide-react';

interface SymbolSelectorProps {
  selectedSymbol: SymbolType;
  onChange: (symbol: SymbolType) => void;
}

const SymbolSelector: React.FC<SymbolSelectorProps> = ({
  selectedSymbol,
  onChange,
}) => {
  const symbols: { type: SymbolType; icon: React.ReactNode; label: string }[] = [
    { type: 'none', icon: null, label: 'None' },
    { type: 'star', icon: <Star size={16} />, label: 'Star' },
    { type: 'heart', icon: <Heart size={16} />, label: 'Heart' },
    { type: 'bolt', icon: <Zap size={16} />, label: 'Bolt' },
    { type: 'check', icon: <Check size={16} />, label: 'Check' },
    { type: 'x', icon: <X size={16} />, label: 'X' },
    { type: 'dots', icon: <Circle size={16} />, label: 'Dots' },
    { type: 'lines', icon: <MoreHorizontal size={16} />, label: 'Lines' },
    { type: 'waves', icon: <Waves size={16} />, label: 'Waves' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Logo Symbol
      </label>
      <div className="grid grid-cols-3 gap-2">
        {symbols.map(({ type, icon, label }) => (
          <button
            key={type}
            type="button"
            className={`p-2 flex flex-col items-center justify-center rounded ${
              selectedSymbol === type
                ? 'bg-indigo-100 text-indigo-700 border-indigo-300 border'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
            } transition-all duration-200`}
            onClick={() => onChange(type)}
          >
            <div className="h-6 flex items-center justify-center">
              {icon}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SymbolSelector;