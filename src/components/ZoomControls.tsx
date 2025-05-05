import React from 'react';
import { ZoomInIcon, ZoomOutIcon, RefreshCw } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  scale
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col p-1">
      <button
        onClick={onZoomIn}
        disabled={scale >= 2}
        className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom in (Ctrl/Cmd + +)"
      >
        <ZoomInIcon size={18} />
      </button>
      
      <button
        onClick={onReset}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        title="Reset zoom (Ctrl/Cmd + 0)"
      >
        <RefreshCw size={18} />
      </button>
      
      <button
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom out (Ctrl/Cmd + -)"
      >
        <ZoomOutIcon size={18} />
      </button>
    </div>
  );
};