import React from 'react';
import { SymbolType } from '../types/indexs';
import { 
  Star, Heart, Zap, Check, X, Circle, MoreHorizontal, Waves
} from 'lucide-react';

interface LogoSymbolProps {
  symbol: SymbolType;
  size: number;
  color: string;
  position: 'left' | 'right' | 'top' | 'bottom' | 'center';
}

const LogoSymbol: React.FC<LogoSymbolProps> = ({
  symbol,
  size,
  color,
  position,
}) => {
  if (symbol === 'none') return null;

  // Common props for all icons
  const iconProps = {
    size: size,
    color: color,
    strokeWidth: 2,
  };

  // Get the appropriate icon component
  const getIcon = () => {
    switch (symbol) {
      case 'star':
        return <Star {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'bolt':
        return <Zap {...iconProps} />;
      case 'check':
        return <Check {...iconProps} />;
      case 'x':
        return <X {...iconProps} />;
      case 'dots':
        return <Circle {...iconProps} />;
      case 'lines':
        return <MoreHorizontal {...iconProps} />;
      case 'waves':
        return <Waves {...iconProps} />;
      default:
        return null;
    }
  };

  // Calculate position styles
  const getPositionStyle = (): React.CSSProperties => {
    const posStyles: React.CSSProperties = {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    };

    switch (position) {
      case 'left':
        return {
          ...posStyles,
          left: '0',
          top: '50%',
          transform: 'translate(0, -50%)',
        };
      case 'right':
        return {
          ...posStyles,
          right: '0',
          top: '50%',
          transform: 'translate(0, -50%)',
        };
      case 'top':
        return {
          ...posStyles,
          left: '50%',
          top: '0',
          transform: 'translate(-50%, 0)',
        };
      case 'bottom':
        return {
          ...posStyles,
          left: '50%',
          bottom: '0',
          transform: 'translate(-50%, 0)',
        };
      case 'center':
      default:
        return {
          ...posStyles,
          left: '50%',
          top: '50%',
        };
    }
  };

  return (
    <div style={getPositionStyle()}>
      {getIcon()}
    </div>
  );
};

export default LogoSymbol;