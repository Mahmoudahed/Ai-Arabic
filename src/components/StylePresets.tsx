'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronRight, LayoutGrid } from 'lucide-react';
import { StylePreset } from './IconForge';

interface StylePresetsProps {
  onPresetSelect: (preset: StylePreset) => void;
}

const StylePresets: React.FC<StylePresetsProps> = ({ onPresetSelect }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Define some preset icon styles
  const presets: StylePreset[] = [
    {
      id: 'material',
      name: 'Material Design',
      description: 'Clean, minimal style with bold colors following material design principles',
      background: '#FFFFFF',
      palette: ['#1976D2', '#D32F2F', '#388E3C', '#FBC02D', '#7B1FA2'],
      elements: [
        {
          id: 'mat_circle',
          type: 'circle',
          x: 100,
          y: 100,
          width: 160,
          height: 160,
          rotation: 0,
          fill: '#1976D2',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1
        },
        {
          id: 'mat_path',
          type: 'path',
          x: 85,
          y: 85,
          width: 130,
          height: 130,
          rotation: 0,
          fill: '#FFFFFF',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          pathData: 'M50,20 L80,20 L80,50 L110,50 L110,80 L80,80 L80,110 L50,110 L50,80 L20,80 L20,50 L50,50 Z'
        }
      ]
    },
    {
      id: 'flat',
      name: 'Flat Design',
      description: 'Modern flat style with long shadow effect',
      background: '#3498DB',
      palette: ['#FFFFFF', '#2C3E50', '#E74C3C', '#2ECC71', '#F1C40F'],
      elements: [
        {
          id: 'flat_circle',
          type: 'circle',
          x: 100,
          y: 100,
          width: 140,
          height: 140,
          rotation: 0,
          fill: '#FFFFFF',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1
        },
        {
          id: 'flat_shadow',
          type: 'path',
          x: 110,
          y: 110,
          width: 120,
          height: 120,
          rotation: 0,
          fill: 'rgba(0,0,0,0.2)',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 0.5,
          pathData: 'M70,70 L120,120 L70,120 Z'
        },
        {
          id: 'flat_icon',
          type: 'path',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          rotation: 0,
          fill: '#2C3E50',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          pathData: 'M20,30 L80,30 L80,40 L60,40 L60,80 L40,80 L40,40 L20,40 Z'
        }
      ]
    },
    {
      id: 'gradient',
      name: 'Gradient Style',
      description: 'Modern look with vibrant gradients',
      background: '#FFFFFF',
      palette: ['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#14B8A6'],
      elements: [
        {
          id: 'grad_circle_bg',
          type: 'circle',
          x: 100,
          y: 100,
          width: 160,
          height: 160,
          rotation: 0,
          fill: '#6366F1',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1
        },
        {
          id: 'grad_circle_overlay',
          type: 'circle',
          x: 120,
          y: 90,
          width: 140,
          height: 140,
          rotation: 0,
          fill: '#EC4899',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 0.6
        },
        {
          id: 'grad_text',
          type: 'text',
          x: 130,
          y: 115,
          width: 100,
          height: 100,
          rotation: 0,
          fill: '#FFFFFF',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          text: 'G',
          fontSize: 60
        }
      ]
    },
    {
      id: 'outline',
      name: 'Outlined',
      description: 'Simple outlined style with clean look',
      background: '#FFFFFF',
      palette: ['#0F172A', '#334155', '#64748B', '#94A3B8', '#F8FAFC'],
      elements: [
        {
          id: 'outline_square',
          type: 'square',
          x: 75,
          y: 75,
          width: 150,
          height: 150,
          rotation: 45,
          fill: 'none',
          stroke: '#0F172A',
          strokeWidth: 8,
          opacity: 1
        },
        {
          id: 'outline_circle',
          type: 'circle',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          rotation: 0,
          fill: 'none',
          stroke: '#0F172A',
          strokeWidth: 8,
          opacity: 1
        },
        {
          id: 'outline_dot',
          type: 'circle',
          x: 130,
          y: 130,
          width: 40,
          height: 40,
          rotation: 0,
          fill: '#0F172A',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1
        }
      ]
    },
    {
      id: 'duotone',
      name: 'Duotone',
      description: 'Two-color style with overlapping shapes',
      background: '#0F172A',
      palette: ['#38BDF8', '#818CF8', '#0284C7', '#4338CA', '#FFFFFF'],
      elements: [
        {
          id: 'duo_circle1',
          type: 'circle',
          x: 80,
          y: 80,
          width: 160,
          height: 160,
          rotation: 0,
          fill: '#38BDF8',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 0.8
        },
        {
          id: 'duo_circle2',
          type: 'circle',
          x: 140,
          y: 140,
          width: 100,
          height: 100,
          rotation: 0,
          fill: '#818CF8',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 0.9
        }
      ]
    },
    {
      id: 'geometric',
      name: 'Geometric',
      description: 'Modern style using basic geometric shapes',
      background: '#FFFFFF',
      palette: ['#F43F5E', '#FB7185', '#FECDD3', '#881337', '#4C0519'],
      elements: [
        {
          id: 'geo_polygon1',
          type: 'polygon',
          x: 75,
          y: 75,
          width: 150,
          height: 150,
          rotation: 0,
          fill: '#F43F5E',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          points: '75,0 150,50 150,150 75,200 0,150 0,50'
        },
        {
          id: 'geo_polygon2',
          type: 'polygon',
          x: 105,
          y: 105,
          width: 90,
          height: 90,
          rotation: 0,
          fill: '#FECDD3',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          points: '45,0 90,30 90,90 45,120 0,90 0,30'
        }
      ]
    }
  ];
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <button
        className="w-full flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <LayoutGrid className="h-5 w-5 mr-2 text-indigo-600" />
          <h3 className="text-sm font-medium text-gray-700">Style Presets</h3>
        </div>
        <ChevronRight
          className={`h-5 w-5 text-gray-400 transition-transform ${
            expanded ? 'transform rotate-90' : ''
          }`}
        />
      </button>
      
      {expanded && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.id}
              className="border rounded-lg p-2 hover:bg-gray-100 transition-colors text-left"
              onClick={() => onPresetSelect(preset)}
            >
              <div className="bg-gray-800 h-24 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                <svg width="60" height="60" viewBox="0 0 200 200">
                  {preset.elements.map((element) => {
                    if (element.type === 'circle') {
                      return (
                        <circle
                          key={element.id}
                          cx={element.x + element.width / 2}
                          cy={element.y + element.height / 2}
                          r={Math.min(element.width, element.height) / 2}
                          fill={element.fill}
                          opacity={element.opacity}
                        />
                      );
                    } else if (element.type === 'square') {
                      return (
                        <rect
                          key={element.id}
                          x={element.x}
                          y={element.y}
                          width={element.width}
                          height={element.height}
                          fill={element.fill}
                          stroke={element.stroke}
                          strokeWidth={element.strokeWidth}
                          opacity={element.opacity}
                          transform={`rotate(${element.rotation} ${element.x + element.width / 2} ${element.y + element.height / 2})`}
                        />
                      );
                    } else if (element.type === 'path') {
                      return (
                        <path
                          key={element.id}
                          d={element.pathData || ''}
                          fill={element.fill}
                          stroke={element.stroke}
                          strokeWidth={element.strokeWidth}
                          opacity={element.opacity}
                          transform={`translate(${element.x}, ${element.y}) rotate(${element.rotation})`}
                        />
                      );
                    } else if (element.type === 'polygon') {
                      return (
                        <polygon
                          key={element.id}
                          points={element.points}
                          fill={element.fill}
                          stroke={element.stroke}
                          strokeWidth={element.strokeWidth}
                          opacity={element.opacity}
                          transform={`translate(${element.x}, ${element.y}) rotate(${element.rotation})`}
                        />
                      );
                    } else if (element.type === 'text') {
                      return (
                        <text
                          key={element.id}
                          x={element.x + element.width / 2}
                          y={element.y + element.height / 2}
                          fontSize={element.fontSize}
                          fill={element.fill}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          opacity={element.opacity}
                        >
                          {element.text}
                        </text>
                      );
                    }
                    return null;
                  })}
                </svg>
              </div>
              <h4 className="text-sm font-medium">{preset.name}</h4>
              <p className="text-xs text-gray-500 truncate" title={preset.description}>
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StylePresets; 