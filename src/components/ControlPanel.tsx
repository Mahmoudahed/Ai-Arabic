import React from 'react';
import { LogoConfig, ShapeType, SymbolType } from '../types/indexs';
import TextInput from './TextInput2';
import ColorPicker from './ColorPicker';
import ShapeSelector from './ShapeSelector';
import SymbolSelector from './SymbolSelector';
import RangeSlider from './RangeSlider';
import ToggleSwitch from './ToggleSwitch';
import PositionSelector from './PositionSelector';
import ExportOptions from './ExportOptions';

interface ControlPanelProps {
  config: LogoConfig;
  onConfigChange: (config: Partial<LogoConfig>) => void;
  onExport: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onConfigChange,
  onExport,
}) => {
  // Create update handlers for each property
  const handleTextChange = (text: string) => {
    onConfigChange({ text });
  };

  const handleShapeChange = (shape: ShapeType) => {
    onConfigChange({ shape });
  };

  const handleSymbolChange = (symbol: SymbolType) => {
    onConfigChange({ symbol });
  };

  const handlePositionChange = (symbolPosition: 'left' | 'right' | 'top' | 'bottom' | 'center') => {
    onConfigChange({ symbolPosition });
  };

  return (
    <div className="overflow-y-auto p-4 border border-gray-200 rounded-lg bg-white shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Logo Settings</h2>
      
      {/* Text Input */}
      <TextInput
        value={config.text}
        onChange={handleTextChange}
        maxLength={15}
        label="Brand Name"
        placeholder="Enter your brand name"
      />

      {/* Shape Section */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-medium text-gray-800 mb-3">Shape</h3>
        
        <ShapeSelector
          selectedShape={config.shape as ShapeType}
          onChange={handleShapeChange}
        />
        
        <RangeSlider
          min={40}
          max={200}
          value={config.shapeSize}
          onChange={(shapeSize) => onConfigChange({ shapeSize })}
          label="Shape Size"
        />
        
        <RangeSlider
          min={0}
          max={50}
          value={config.borderRadius}
          onChange={(borderRadius) => onConfigChange({ borderRadius })}
          label="Corner Radius"
        />
        
        <RangeSlider
          min={0}
          max={10}
          value={config.borderWidth}
          onChange={(borderWidth) => onConfigChange({ borderWidth })}
          label="Border Width"
        />
        
        <ColorPicker
          selectedColor={config.borderColor}
          onChange={(borderColor) => onConfigChange({ borderColor })}
          label="Border Color"
        />
        
        <RangeSlider
          min={0}
          max={360}
          value={config.rotation}
          onChange={(rotation) => onConfigChange({ rotation })}
          label="Rotation"
        />
      </div>

      {/* Text Styling */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-medium text-gray-800 mb-3">Text Styling</h3>
        
        <RangeSlider
          min={12}
          max={72}
          value={config.fontSize}
          onChange={(fontSize) => onConfigChange({ fontSize })}
          label="Font Size"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Weight
          </label>
          <select
            value={config.fontWeight}
            onChange={(e) => onConfigChange({ fontWeight: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="300">Light</option>
            <option value="400">Regular</option>
            <option value="500">Medium</option>
            <option value="600">Semi Bold</option>
            <option value="700">Bold</option>
            <option value="800">Extra Bold</option>
          </select>
        </div>
      </div>

      {/* Symbol Settings */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-medium text-gray-800 mb-3">Symbol</h3>
        
        <SymbolSelector
          selectedSymbol={config.symbol as SymbolType}
          onChange={handleSymbolChange}
        />
        
        {config.symbol !== 'none' && (
          <>
            <RangeSlider
              min={12}
              max={48}
              value={config.symbolSize}
              onChange={(symbolSize) => onConfigChange({ symbolSize })}
              label="Symbol Size"
            />
            
            <ColorPicker
              selectedColor={config.symbolColor}
              onChange={(symbolColor) => onConfigChange({ symbolColor })}
              label="Symbol Color"
            />
            
            <PositionSelector
              selectedPosition={config.symbolPosition}
              onChange={handlePositionChange}
              label="Symbol Position"
            />
          </>
        )}
      </div>

      {/* Colors Section */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-medium text-gray-800 mb-3">Colors</h3>
        
        <ColorPicker
          selectedColor={config.backgroundColor}
          onChange={(backgroundColor) => onConfigChange({ backgroundColor })}
          label="Background Color"
        />
        
        <ColorPicker
          selectedColor={config.fontColor}
          onChange={(fontColor) => onConfigChange({ fontColor })}
          label="Text Color"
        />
      </div>

      {/* Effects Section */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-medium text-gray-800 mb-3">Effects</h3>
        
        <ToggleSwitch
          checked={config.shadow}
          onChange={(shadow) => onConfigChange({ shadow })}
          label="Shadow Effect"
        />
        
        {config.shadow && (
          <>
            <ColorPicker
              selectedColor={config.shadowColor}
              onChange={(shadowColor) => onConfigChange({ shadowColor })}
              label="Shadow Color"
            />
            
            <RangeSlider
              min={0}
              max={20}
              value={config.shadowBlur}
              onChange={(shadowBlur) => onConfigChange({ shadowBlur })}
              label="Shadow Blur"
            />
          </>
        )}
      </div>

      {/* Export Section */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <ExportOptions onExport={onExport} />
      </div>
    </div>
  );
};

export default ControlPanel;