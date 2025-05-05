import React, { useState, useRef, useEffect } from "react";
import { Node as NodeComponent } from "./Nodes";
import { Connection as ConnectionComponent } from "./Connection";
import { Node, Connection } from "../types/indexs";

interface MindMapProps {
  nodes: Node[];
  connections: Connection[];
  selectedNode: string | null;
  onNodeSelect: (id: string | null) => void;
  onNodePositionChange: (id: string, x: number, y: number) => void;
  onNodeTextChange: (id: string, text: string) => void;
  onNodeAddChild: (parentId: string, text: string) => void;
  onNodeDelete: (id: string) => void;
  onNodeWithdraw: (id: string) => void;
  onNodeColorChange: (id: string, color: string) => void;
  onNodeTextColorChange: (id: string, color: string) => void;
}

export const MindMap: React.FC<MindMapProps> = ({
  nodes,
  connections,
  selectedNode,
  onNodeSelect,
  onNodePositionChange,
  onNodeTextChange,
  onNodeAddChild,
  onNodeDelete,
  onNodeWithdraw,
  onNodeColorChange,
  onNodeTextColorChange
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const startDragRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (nodes.length === 0 || !mapRef.current) return;
    
    if (nodes.length === 1) {
      centerMap();
    }
  }, [nodes.length]);

  const centerMap = () => {
    if (!mapRef.current) return;
    
    const rootNode = nodes.find(node => node.parentId === null);
    if (!rootNode) return;
    
    const containerWidth = mapRef.current.clientWidth;
    const containerHeight = mapRef.current.clientHeight;
    
    setPosition({
      x: containerWidth / 2 - rootNode.x,
      y: containerHeight / 2 - rootNode.y
    });
  };

  const handleBackgroundClick = () => {
    onNodeSelect(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    
    if ((e.target as HTMLElement).closest('.node')) return;
    
    setDragging(true);
    startDragRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { x: position.x, y: position.y };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    if ((e.target as HTMLElement).closest('.node')) return;
    
    setDragging(true);
    const touch = e.touches[0];
    startDragRef.current = { x: touch.clientX, y: touch.clientY };
    startPosRef.current = { x: position.x, y: position.y };
    
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    
    const dx = e.clientX - startDragRef.current.x;
    const dy = e.clientY - startDragRef.current.y;
    
    setPosition({
      x: startPosRef.current.x + dx,
      y: startPosRef.current.y + dy
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging || e.touches.length !== 1) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const dx = touch.clientX - startDragRef.current.x;
    const dy = touch.clientY - startDragRef.current.y;
    
    setPosition({
      x: startPosRef.current.x + dx,
      y: startPosRef.current.y + dy
    });
  };

  const handleTouchEnd = () => {
    setDragging(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    
    if (mapRef.current) {
      const containerRect = mapRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      const mouseXInMap = (mouseX - position.x) / scale;
      const mouseYInMap = (mouseY - position.y) / scale;
      
      const newPosition = {
        x: mouseX - mouseXInMap * newScale,
        y: mouseY - mouseYInMap * newScale
      };
      
      setPosition(newPosition);
    }
    
    setScale(newScale);
  };

  const handleAddChild = (parentId: string) => {
    onNodeAddChild(parentId, "New Node");
  };

  return (
    <div
      ref={mapRef}
      className={`relative overflow-hidden w-full h-full bg-gray-50 ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onClick={handleBackgroundClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <div
        className="absolute transition-transform duration-200 ease-linear"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "0 0"
        }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            width: "10000px",
            height: "10000px",
            transform: "translate(-5000px, -5000px)"
          }}
        >
          {connections.map(connection => {
            const source = nodes.find(node => node.id === connection.source);
            const target = nodes.find(node => node.id === connection.target);
            
            if (!source || !target) return null;
            
            return (
              <ConnectionComponent
                key={`${connection.source}-${connection.target}`}
                connection={connection}
                sourcePosition={{ x: source.x + 5000, y: source.y + 5000 }}
                targetPosition={{ x: target.x + 5000, y: target.y + 5000 }}
                color={source.withdrawn || target.withdrawn ? '#9CA3AF' : (source.color || "#3B82F6")}
              />
            );
          })}
        </svg>

        {nodes.map(node => (
          <NodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            onSelect={onNodeSelect}
            onPositionChange={onNodePositionChange}
            onTextChange={onNodeTextChange}
            onAddChild={handleAddChild}
            onDelete={onNodeDelete}
            onWithdraw={onNodeWithdraw}
            onColorChange={onNodeColorChange}
            onTextColorChange={onNodeTextColorChange}
            scale={scale}
            className="node"
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-2 py-1 flex items-center space-x-2">
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => setScale(Math.max(0.5, scale - 0.1))}
        >
          -
        </button>
        <span className="text-sm text-gray-700">{Math.round(scale * 100)}%</span>
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => setScale(Math.min(2, scale + 0.1))}
        >
          +
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={centerMap}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};