import React, { useState, useRef, useEffect } from 'react';
import { useMindMap } from '../context/MindMapContext';
import { NodeMenu } from './NodeMenu';
import { NodeType } from '../types';
import { Edit2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface NodeProps {
  node: NodeType;
  isSelected: boolean;
}

export const Node: React.FC<NodeProps> = ({ node, isSelected }) => {
  const { 
    updateNodePosition, 
    updateNodeText,
    updateNodeImage, 
    deleteNode, 
    addChildNode, 
    setSelectedNodeId 
  } = useMindMap();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [nodeText, setNodeText] = useState(node.text);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Colors based on node level
  const getNodeColors = () => {
    const colorClasses = [
      'bg-blue-50 border-blue-300 text-blue-800', // Root
      'bg-teal-50 border-teal-300 text-teal-800', // Level 1
      'bg-purple-50 border-purple-300 text-purple-800', // Level 2
      'bg-amber-50 border-amber-300 text-amber-800', // Level 3
      'bg-rose-50 border-rose-300 text-rose-800', // Level 4+
    ];
    
    const level = Math.min(node.level, colorClasses.length - 1);
    return colorClasses[level];
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
    
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
    setSelectedNodeId(node.id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateNodePosition(node.id, {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setShowMenu(false);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 10);
  };

  const handleBlur = () => {
    finishEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      finishEditing();
    }
    
    if (e.key === 'Escape') {
      setNodeText(node.text);
      setIsEditing(false);
    }
  };

  const finishEditing = () => {
    if (nodeText.trim() !== '') {
      updateNodeText(node.id, nodeText);
    } else {
      setNodeText(node.text);
    }
    setIsEditing(false);
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    addChildNode(node.id);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(node.id);
    setShowMenu(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setShowMenu(false);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 10);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      updateNodeImage(node.id, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleDocMouseMove = (e: MouseEvent) => {
        updateNodePosition(node.id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      };

      const handleDocMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleDocMouseMove);
      document.addEventListener('mouseup', handleDocMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleDocMouseMove);
        document.removeEventListener('mouseup', handleDocMouseUp);
      };
    }
  }, [isDragging, node.id, dragOffset, updateNodePosition]);

  useEffect(() => {
    setNodeText(node.text);
  }, [node.text]);

  return (
    <div
      ref={nodeRef}
      className={`absolute min-w-[100px] max-w-[280px] p-0.5 rounded-lg shadow-md transform 
                 ${isDragging ? 'cursor-grabbing scale-105 opacity-90 z-50' : 'cursor-grab'}
                 ${isSelected ? 'ring-2 ring-blue-500 z-40' : ''}
                 transition-all duration-150 ease-in-out`}
      style={{ 
        left: `${node.x}px`, 
        top: `${node.y}px`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNodeId(node.id);
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
      }}
    >
      <div className={`${getNodeColors()} rounded-lg border-2 p-3 w-full h-full`}>
        {node.image && (
          <div className="mb-2">
            <img 
              src={node.image} 
              alt="Node illustration" 
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
        {isEditing ? (
          <textarea
            ref={inputRef}
            value={nodeText}
            onChange={(e) => setNodeText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full bg-white bg-opacity-90 p-2 rounded outline-none resize-none text-gray-800"
            autoFocus
            rows={Math.max(2, (nodeText.match(/\n/g) || []).length + 1)}
          />
        ) : (
          <div className="font-medium whitespace-pre-wrap break-words">
            {node.text}
          </div>
        )}
      </div>

      {isSelected && !isEditing && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <button 
            onClick={handleAddImage}
            className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-purple-600 transition-colors"
            title="Add image"
          >
            <ImageIcon size={14} />
          </button>
          <button 
            onClick={handleAddChild}
            className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
            title="Add child node"
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {showMenu && (
        <NodeMenu
          onAddChild={handleAddChild}
          onAddImage={handleAddImage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canDelete={!node.isRoot}
        />
      )}
    </div>
  );
};