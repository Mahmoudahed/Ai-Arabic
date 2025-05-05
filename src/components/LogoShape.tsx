import React from 'react';
import { ShapeType } from '../types/indexs';

interface LogoShapeProps {
  shape: ShapeType;
  size: number;
  color: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  rotation?: number;
  children?: React.ReactNode;
}

const LogoShape: React.FC<LogoShapeProps> = ({
  shape,
  size,
  color,
  borderRadius = 0,
  borderWidth = 0,
  borderColor = 'transparent',
  rotation = 0,
  children,
}) => {
  // Base styles for all shapes
  const baseStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transform: `rotate(${rotation}deg)`,
    borderWidth: `${borderWidth}px`,
    borderColor,
    borderStyle: 'solid',
    transition: 'all 0.3s ease',
  };

  // Shape-specific styles
  const getShapeStyle = (): React.CSSProperties => {
    switch (shape) {
      case 'circle':
        return {
          ...baseStyle,
          borderRadius: '50%',
        };
      case 'square':
        return {
          ...baseStyle,
          borderRadius: '0',
        };
      case 'rounded':
        return {
          ...baseStyle,
          borderRadius: `${borderRadius}px`,
        };
      case 'pill':
        return {
          ...baseStyle,
          borderRadius: '999px',
        };
      case 'diamond':
        return {
          ...baseStyle,
          transform: `rotate(45deg) scale(0.7)`,
        };
      case 'hexagon':
        return {
          ...baseStyle,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        };
      case 'triangle':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      case 'rectangle':
      default:
        return {
          ...baseStyle,
          width: `${size * 1.5}px`,
          height: `${size}px`,
          borderRadius: `${borderRadius}px`,
        };
    }
  };

  // For diamond shape, we need to counter-rotate the content
  const contentStyle: React.CSSProperties = 
    shape === 'diamond' 
      ? { transform: 'rotate(-45deg) scale(1.4)' } 
      : {};

  return (
    <div style={getShapeStyle()}>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default LogoShape;