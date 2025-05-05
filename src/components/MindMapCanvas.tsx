'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useMindMap } from '../context/MindMapContext';
import { Node } from './Node';
import { ConnectionLines } from './ConnectionLines';
import { ZoomControls } from './ZoomControls';
import { BanIcon as PanIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';

export const MindMapCanvas: React.FC = () => {
  const { nodes, connections, selectedNodeId, setSelectedNodeId } = useMindMap();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas, not on a node
    if (e.target === canvasRef.current) {
      setSelectedNodeId(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start panning if clicking directly on the canvas with middle button or space key is pressed
    if (e.target === canvasRef.current && e.button === 1) {
      setIsPanning(true);
      setStartPan({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - startPan.x;
      const deltaY = e.clientY - startPan.y;
      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY
      });
      setStartPan({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space + drag to pan
      if (e.code === 'Space') {
        document.body.style.cursor = 'grab';
      }
      
      // Ctrl/Cmd + '+' to zoom in
      if ((e.ctrlKey || e.metaKey) && e.key === '+') {
        handleZoomIn();
        e.preventDefault();
      }
      
      // Ctrl/Cmd + '-' to zoom out
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        handleZoomOut();
        e.preventDefault();
      }
      
      // Ctrl/Cmd + '0' to reset zoom
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        handleReset();
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        document.body.style.cursor = 'default';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position, scale]);

  // Early return if nodes is not an array
  if (!Array.isArray(nodes)) {
    console.warn('MindMapCanvas: nodes prop is not an array');
    return null;
  }

  return (
    <div 
      className="flex-1 relative overflow-hidden bg-gray-50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-default transition-transform duration-100"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
        }}
        onClick={handleCanvasClick}
      >
        <ConnectionLines connections={connections} nodes={nodes} />
        
        {nodes.map(node => (
          <Node 
            key={node.id} 
            node={node} 
            isSelected={node.id === selectedNodeId}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        <ZoomControls 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut} 
          onReset={handleReset}
          scale={scale}
        />
      </div>

      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-md px-3 py-1.5 text-sm font-medium">
        {isPanning ? (
          <div className="flex items-center">
            <PanIcon className="w-4 h-4 mr-1.5" /> Panning
          </div>
        ) : (
          <div className="flex items-center">
            <span className="mr-1.5">Zoom:</span> {Math.round(scale * 100)}%
          </div>
        )}
      </div>
    </div>
  );
};