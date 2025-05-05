import React, { useState, useRef, useEffect } from "react";
import { Node as NodeType } from "../types/indexs";
import { Edit2, Trash2, Plus, MinusCircle, GripHorizontal, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Palette, Type } from "lucide-react";

interface NodeProps {
  node: NodeType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  onWithdraw: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  onTextColorChange: (id: string, color: string) => void;
  scale: number;
}

export const Node: React.FC<NodeProps> = ({
  node,
  isSelected,
  onSelect,
  onPositionChange,
  onTextChange,
  onAddChild,
  onDelete,
  onWithdraw,
  onColorChange,
  onTextColorChange,
  scale
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(node.text);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const nodePosRef = useRef({ x: node.x, y: node.y });

  useEffect(() => {
    setText(node.text);
  }, [node.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
    
    e.stopPropagation();
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    nodePosRef.current = { x: node.x, y: node.y };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEditing) return;
    
    e.stopPropagation();
    setIsDragging(true);
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    nodePosRef.current = { x: node.x, y: node.y };
    
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const dx = (e.clientX - startPosRef.current.x) / scale;
    const dy = (e.clientY - startPosRef.current.y) / scale;
    
    const newX = nodePosRef.current.x + dx;
    const newY = nodePosRef.current.y + dy;
    
    onPositionChange(node.id, newX, newY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const dx = (touch.clientX - startPosRef.current.x) / scale;
    const dy = (touch.clientY - startPosRef.current.y) / scale;
    
    const newX = nodePosRef.current.x + dx;
    const newY = nodePosRef.current.y + dy;
    
    onPositionChange(node.id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleEditStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEditEnd = () => {
    setIsEditing(false);
    onTextChange(node.id, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditEnd();
    }
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddChild(node.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(node.id);
  };

  const handleWithdraw = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWithdraw(node.id);
  };

  const handleMoveNode = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 10; // pixels to move
    let newX = node.x;
    let newY = node.y;

    switch (direction) {
      case 'up':
        newY -= step;
        break;
      case 'down':
        newY += step;
        break;
      case 'left':
        newX -= step;
        break;
      case 'right':
        newX += step;
        break;
    }

    onPositionChange(node.id, newX, newY);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(node.id, e.target.value);
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextColorChange(node.id, e.target.value);
  };

  const getNodeStyle = () => {
    const baseStyle = {
      transform: `translate(${node.x}px, ${node.y}px)`,
      backgroundColor: node.withdrawn ? '#9CA3AF' : (node.color || "#3B82F6"),
      color: node.textColor || "#FFFFFF",
      cursor: isDragging ? "grabbing" : "grab",
      boxShadow: isSelected
        ? "0 0 0 2px #f3f4f6, 0 0 0 4px #3B82F6, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      opacity: isDragging ? 0.8 : (node.withdrawn ? 0.6 : 1),
      zIndex: isSelected ? 10 : (isDragging ? 20 : 1),
      transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
    };

    return baseStyle;
  };

  return (
    <div
      ref={nodeRef}
      className={`absolute select-none rounded-2xl px-4 py-3 transition-all duration-200 node ${
        node.level === 0 ? "min-w-[180px]" : "min-w-[140px]"
      } ${isSelected ? "z-10" : "z-0"} ${isDragging ? "scale-105" : ""}`}
      style={getNodeStyle()}
      onClick={handleSelect}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="flex items-center gap-2">
        <GripHorizontal size={14} className="opacity-75" />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={handleEditEnd}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none font-medium"
            style={{ color: node.textColor || "#FFFFFF" }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="font-medium truncate max-w-[200px]">
            {node.text}
          </div>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute -right-3 -bottom-3 flex flex-col space-y-1">
          <div className="flex space-x-1">
            <button
              onClick={handleEditStart}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            >
              <Edit2 size={14} className="text-gray-700" />
            </button>
            <button
              onClick={handleAddChild}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} className="text-gray-700" />
            </button>
            <button
              onClick={handleWithdraw}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              title={node.withdrawn ? "Restore Node" : "Withdraw Node"}
            >
              <MinusCircle size={14} className="text-gray-700" />
            </button>
            {node.level > 0 && (
              <button
                onClick={handleDelete}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              >
                <Trash2 size={14} className="text-gray-700" />
              </button>
            )}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handleMoveNode('up')}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              title="Move Up"
            >
              <ArrowUp size={14} className="text-gray-700" />
            </button>
            <button
              onClick={() => handleMoveNode('down')}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              title="Move Down"
            >
              <ArrowDown size={14} className="text-gray-700" />
            </button>
            <button
              onClick={() => handleMoveNode('left')}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              title="Move Left"
            >
              <ArrowLeft size={14} className="text-gray-700" />
            </button>
            <button
              onClick={() => handleMoveNode('right')}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              title="Move Right"
            >
              <ArrowRight size={14} className="text-gray-700" />
            </button>
          </div>
          <div className="flex space-x-1">
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                title="Change Background Color"
              >
                <Palette size={14} className="text-gray-700" />
              </button>
              {showColorPicker && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2">
                  <input
                    type="color"
                    value={node.color || "#3B82F6"}
                    onChange={handleColorChange}
                    className="w-8 h-8 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                title="Change Text Color"
              >
                <Type size={14} className="text-gray-700" />
              </button>
              {showTextColorPicker && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2">
                  <input
                    type="color"
                    value={node.textColor || "#FFFFFF"}
                    onChange={handleTextColorChange}
                    className="w-8 h-8 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};