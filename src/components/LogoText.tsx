import React from 'react';

interface LogoTextProps {
  text: string;
  color: string;
  fontSize: number;
  fontWeight: string;
}

const LogoText: React.FC<LogoTextProps> = ({
  text,
  color,
  fontSize,
  fontWeight,
}) => {
  const textStyle: React.CSSProperties = {
    color,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight as 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    textAlign: 'center',
    letterSpacing: '0.05em',
    userSelect: 'none',
    textTransform: 'uppercase',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 0,
    lineHeight: 1,
    transition: 'all 0.3s ease',
  };

  return (
    <h1 style={textStyle}>{text}</h1>
  );
};

export default LogoText;