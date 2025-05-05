import React from 'react';
import { ConnectionType, NodeType } from '../types';

interface ConnectionLinesProps {
  connections: ConnectionType[];
  nodes: NodeType[];
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ connections, nodes }) => {
  // Get path between two nodes
  const getPath = (fromNode: NodeType, toNode: NodeType) => {
    // Calculate center points of nodes
    const fromCenterX = fromNode.x + 50; // Approximation
    const fromCenterY = fromNode.y + 20; // Approximation
    
    const toCenterX = toNode.x + 50; // Approximation
    const toCenterY = toNode.y + 20; // Approximation
    
    // Calculate control points for the curve
    const dx = toCenterX - fromCenterX;
    const dy = toCenterY - fromCenterY;
    
    const midX = fromCenterX + dx / 2;
    const midY = fromCenterY + dy / 2;
    
    // Bezier curve path 
    const path = `M ${fromCenterX} ${fromCenterY} 
                Q ${midX} ${fromCenterY}, ${midX} ${midY} 
                Q ${midX} ${toCenterY}, ${toCenterX} ${toCenterY}`;
                
    return path;
  };

  // Get color based on node level
  const getLineColor = (level: number) => {
    const colors = [
      'stroke-blue-400', // Root to level 1
      'stroke-teal-400', // Level 1 to level 2
      'stroke-purple-400', // Level 2 to level 3
      'stroke-amber-400', // Level 3 to level 4
      'stroke-rose-400', // Level 4+
    ];
    
    return colors[Math.min(level, colors.length - 1)];
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {connections.map(conn => {
        const fromNode = nodes.find(n => n.id === conn.fromId);
        const toNode = nodes.find(n => n.id === conn.toId);
        
        if (!fromNode || !toNode) return null;
        
        const path = getPath(fromNode, toNode);
        const lineColor = getLineColor(fromNode.level);
        
        return (
          <path
            key={`${conn.fromId}-${conn.toId}`}
            d={path}
            fill="none"
            className={`${lineColor} transition-all duration-300`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={conn.isDashed ? "5,5" : "none"}
          />
        );
      })}
    </svg>
  );
};