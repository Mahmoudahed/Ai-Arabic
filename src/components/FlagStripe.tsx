import React from 'react';
import { Pattern } from '../utils/patternUtils';

interface FlagStripeProps {
  color: string;
  widthPercent: number;
  isAnimating: boolean;
  delay: number;
  pattern: Pattern;
}

export const FlagStripe: React.FC<FlagStripeProps> = ({ 
  color, 
  widthPercent,
  isAnimating,
  delay,
  pattern
}) => {
  const getPatternStyle = () => {
    const baseStyle = {
      backgroundColor: color,
      width: `${widthPercent}%`,
      transform: isAnimating ? 'scaleY(0)' : 'scaleY(1)',
      transformOrigin: 'center',
      transitionDelay: `${delay}s`
    };

    switch (pattern.type) {
      case 'horizontal':
        return {
          ...baseStyle,
          height: '100%'
        };
      case 'vertical':
        return {
          ...baseStyle,
          height: '100%',
          transform: isAnimating ? 'scaleX(0)' : 'scaleX(1)'
        };
      case 'diagonal':
        return {
          ...baseStyle,
          height: '100%',
          transform: isAnimating ? 'scale(0)' : 'scale(1) skew(-15deg)',
          marginLeft: '-5px',
          marginRight: '-5px'
        };
      case 'triangular':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          height: '100%'
        };
      case 'wave':
        return {
          ...baseStyle,
          height: '100%',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div 
      className="h-full transition-all duration-500 ease-in-out"
      style={getPatternStyle()}
    />
  );
};