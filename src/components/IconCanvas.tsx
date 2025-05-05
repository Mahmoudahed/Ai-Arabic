'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconElement } from './IconForge';
import { Trash2 } from 'lucide-react';

interface IconCanvasProps {
  elements: IconElement[];
  background: string;
  selectedElement: string | null;
  onElementSelect: (id: string | null) => void;
  onElementUpdate: (id: string, updates: Partial<IconElement>) => void;
  onElementRemove: (id: string) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const IconCanvas: React.FC<IconCanvasProps> = ({
  elements,
  background,
  selectedElement,
  onElementSelect,
  onElementUpdate,
  onElementRemove,
  canvasRef
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Update the canvas whenever the SVG changes
  useEffect(() => {
    if (svgRef.current && canvasRef.current) {
      const svg = svgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Set canvas size
      canvas.width = 1000;
      canvas.height = 1000;
      
      // Create a data URL from the SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Draw the SVG to the canvas
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    }
  }, [elements, background, canvasRef]);

  // Handle drag events
  const handleDrag = (
    id: string,
    e: MouseEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Convert drag position to relative coordinates
    const x = (info.offset.x / rect.width) * 300;
    const y = (info.offset.y / rect.height) * 300;
    
    onElementUpdate(id, { x, y });
  };
  
  // Render SVG shapes
  const renderElement = (element: IconElement) => {
    const isSelected = element.id === selectedElement;
    const baseProps = {
      fill: element.fill,
      stroke: element.stroke,
      strokeWidth: element.strokeWidth,
      opacity: element.opacity,
      style: {
        transform: `rotate(${element.rotation}deg)`,
        cursor: 'move'
      }
    };
    
    // Select the appropriate shape based on element type
    switch (element.type) {
      case 'circle':
        return (
          <circle
            cx={element.width / 2}
            cy={element.height / 2}
            r={Math.min(element.width, element.height) / 2}
            {...baseProps}
          />
        );
      
      case 'square':
        return (
          <rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            {...baseProps}
          />
        );
      
      case 'triangle':
        const points = `${element.width / 2},0 0,${element.height} ${element.width},${element.height}`;
        return (
          <polygon
            points={points}
            {...baseProps}
          />
        );
      
      case 'polygon':
        return (
          <polygon
            points={element.points || ''}
            {...baseProps}
          />
        );
      
      case 'path':
        return (
          <path
            d={element.pathData || ''}
            {...baseProps}
          />
        );
      
      case 'text':
        return (
          <text
            x={element.width / 2}
            y={element.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={element.fontSize || 24}
            fontWeight="bold"
            {...baseProps}
          >
            {element.text || 'A'}
          </text>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      style={{ backgroundColor: background }}
      onClick={() => onElementSelect(null)} // Deselect when clicking on background
    >
      {/* Hidden canvas for export */}
      <canvas 
        ref={canvasRef}
        style={{ display: 'none' }}
        width="1000"
        height="1000"
      />
      
      {/* SVG for display and interaction */}
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: background }}
      >
        {/* Render all elements */}
        {elements.map((element: IconElement) => (
          <motion.g
            key={element.id}
            drag
            dragMomentum={false}
            onDrag={(e, info) => handleDrag(element.id, e as MouseEvent, info)}
            initial={{ x: element.x, y: element.y }}
            animate={{ x: element.x, y: element.y }}
            whileDrag={{ scale: 1.05 }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            style={{ 
              position: 'relative',
              filter: element.id === selectedElement ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : undefined
            }}
          >
            {renderElement(element)}
            
            {/* Selection outline */}
            {element.id === selectedElement && (
              <>
                <rect
                  x={-5}
                  y={-5}
                  width={element.width + 10}
                  height={element.height + 10}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="4"
                  style={{ pointerEvents: 'none' }}
                />
                
                {/* Delete button */}
                <foreignObject
                  x={element.width - 5}
                  y={-15}
                  width={20}
                  height={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    onElementRemove(element.id);
                  }}
                >
                  <div className="flex items-center justify-center bg-red-500 text-white rounded-full w-5 h-5 cursor-pointer hover:bg-red-600">
                    <Trash2 size={12} />
                  </div>
                </foreignObject>
                
                {/* Rotation handle */}
                <circle
                  cx={element.width / 2}
                  cy={-15}
                  r={6}
                  fill="#3B82F6"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  cursor="grab"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    
                    // Calculate center point for rotation
                    const centerX = element.x + element.width / 2;
                    const centerY = element.y + element.height / 2;
                    
                    const handleRotation = (moveEvent: MouseEvent) => {
                      if (!containerRef.current) return;
                      
                      const rect = containerRef.current.getBoundingClientRect();
                      const mouseX = (moveEvent.clientX - rect.left) / rect.width * 300;
                      const mouseY = (moveEvent.clientY - rect.top) / rect.height * 300;
                      
                      // Calculate angle
                      const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
                      onElementUpdate(element.id, { rotation: angle + 90 });
                    };
                    
                    // Add mousemove event listener
                    document.addEventListener('mousemove', handleRotation);
                    
                    // Add mouseup event listener to clean up
                    document.addEventListener('mouseup', () => {
                      document.removeEventListener('mousemove', handleRotation);
                    }, { once: true });
                  }}
                />
                
                {/* Resize handle */}
                <circle
                  cx={element.width}
                  cy={element.height}
                  r={6}
                  fill="#3B82F6"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  cursor="nwse-resize"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    
                    const startWidth = element.width;
                    const startHeight = element.height;
                    const startX = e.clientX;
                    const startY = e.clientY;
                    
                    const handleResize = (moveEvent: MouseEvent) => {
                      const dx = moveEvent.clientX - startX;
                      const dy = moveEvent.clientY - startY;
                      
                      if (!containerRef.current) return;
                      
                      const rect = containerRef.current.getBoundingClientRect();
                      const scale = 300 / rect.width;
                      
                      const newWidth = Math.max(20, startWidth + dx * scale);
                      const newHeight = Math.max(20, startHeight + dy * scale);
                      
                      onElementUpdate(element.id, { width: newWidth, height: newHeight });
                    };
                    
                    // Add mousemove event listener
                    document.addEventListener('mousemove', handleResize);
                    
                    // Add mouseup event listener to clean up
                    document.addEventListener('mouseup', () => {
                      document.removeEventListener('mousemove', handleResize);
                    }, { once: true });
                  }}
                />
              </>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default IconCanvas; 