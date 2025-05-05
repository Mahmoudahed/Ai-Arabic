import React from 'react';

interface FlagSymbolProps {
  symbol: string;
  size: 'small' | 'medium' | 'large';
  isAnimating?: boolean;
}

export const FlagSymbol: React.FC<FlagSymbolProps> = ({ 
  symbol, 
  size,
  isAnimating = false
}) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl md:text-7xl'
  };

  return (
    <div 
      className={`${sizeClasses[size]} text-white drop-shadow-lg font-bold
        transition-all duration-500 ease-out
        ${isAnimating ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
    >
      {symbol}
    </div>
  );
};