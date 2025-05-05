import React from "react";
import { Connection as ConnectionType } from "../types/indexs";

interface ConnectionProps {
  connection: ConnectionType;
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  color: string;
}

export const Connection: React.FC<ConnectionProps> = ({
  connection,
  sourcePosition,
  targetPosition,
  color
}) => {
  // Calculate control points for a curved line
  const midX = (sourcePosition.x + targetPosition.x) / 2;
  const midY = (sourcePosition.y + targetPosition.y) / 2;
  
  // Create path for curved connection
  const path = `
    M ${sourcePosition.x} ${sourcePosition.y}
    Q ${midX + (Math.random() * 20 - 10)} ${midY + (Math.random() * 20 - 10)}, ${targetPosition.x} ${targetPosition.y}
  `;

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.6"
        strokeLinecap="round"
        className="transition-all duration-300 ease-in-out"
      />
    </g>
  );
};