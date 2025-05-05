import React from 'react';
import { LogoConfig } from '../types/indexs';
import LogoShape from './LogoShape';
import LogoText from './LogoText';
import LogoSymbol from './LogoSymbol';

interface LogoPreviewProps {
  config: LogoConfig;
}

const LogoPreview: React.FC<LogoPreviewProps> = ({ config }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 relative">
        <LogoShape
          shape={config.shape as any}
          size={config.shapeSize}
          color={config.backgroundColor}
          borderRadius={config.borderRadius}
          borderWidth={config.borderWidth}
          borderColor={config.borderColor}
          rotation={config.rotation}
        >
          <LogoText
            text={config.abbreviation}
            color={config.fontColor}
            fontSize={config.fontSize}
            fontWeight={config.fontWeight}
          />
          <LogoSymbol
            symbol={config.symbol as any}
            size={config.symbolSize}
            color={config.symbolColor}
            position={config.symbolPosition}
          />
        </LogoShape>
      </div>
      <p className="text-sm text-gray-500 mb-1">
        Full text: <span className="font-medium text-gray-700">{config.text}</span>
      </p>
      <p className="text-sm text-gray-500">
        Abbreviation: <span className="font-medium text-gray-700">{config.abbreviation}</span>
      </p>
    </div>
  );
};

export default LogoPreview;