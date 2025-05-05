'use client';
import React, { useState } from 'react';
import { useMindMap } from '../context/MindMapContext';
import { 
  Brain, 
  Plus, 
  Save, 
  Upload, 
  Download, 
  Trash2, 
  UndoIcon, 
  RedoIcon, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { KeyboardShortcuts } from './KeyboardShortcuts';

export const Sidebar: React.FC = () => {
  const { 
    createNewMindMap, 
    saveMindMap, 
    loadMindMap, 
    exportMindMap,
    canUndo, 
    canRedo, 
    undo, 
    redo,
    mindMapName,
    setMindMapName
  } = useMindMap();
  
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          loadMindMap(data);
        } catch (error) {
          alert('Invalid mind map file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-white p-2 rounded-md shadow-md"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div 
        className={`bg-white border-r border-gray-200 p-4 flex flex-col h-full shadow-md 
                   transition-all duration-300 ease-in-out z-10
                   ${isExpanded ? 'w-64' : 'w-0 md:w-16 overflow-hidden'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Brain className="text-blue-500 h-6 w-6" />
            {isExpanded && (
              <h1 className="ml-2 font-bold text-xl text-gray-800">MindFlow</h1>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:block text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="mb-4">
            <label htmlFor="map-name" className="block text-sm font-medium text-gray-700 mb-1">
              Mind Map Name
            </label>
            <input
              type="text"
              id="map-name"
              value={mindMapName}
              onChange={(e) => setMindMapName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Untitled Mind Map"
            />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <SidebarButton 
            icon={<Plus />} 
            label="New Mind Map" 
            onClick={createNewMindMap} 
            expanded={isExpanded}
            shortcut="Ctrl+N"
          />
          
          <SidebarButton 
            icon={<Save />} 
            label="Save" 
            onClick={saveMindMap} 
            expanded={isExpanded} 
            shortcut="Ctrl+S"
          />
          
          <SidebarButton 
            icon={<Download />} 
            label="Export" 
            onClick={exportMindMap} 
            expanded={isExpanded}
          />
          
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept=".json"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <SidebarButton 
              icon={<Upload />} 
              label="Import" 
              onClick={() => {}} 
              expanded={isExpanded}
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <SidebarButton 
              icon={<UndoIcon />} 
              label="Undo" 
              onClick={undo} 
              expanded={isExpanded}
              disabled={!canUndo}
              shortcut="Ctrl+Z"
            />
            <SidebarButton 
              icon={<RedoIcon />} 
              label="Redo" 
              onClick={redo} 
              expanded={isExpanded}
              disabled={!canRedo}
              shortcut="Ctrl+Y"
            />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <SidebarButton 
            icon={<HelpCircle />} 
            label="Keyboard Shortcuts" 
            onClick={() => setShowShortcuts(true)} 
            expanded={isExpanded}
          />
        </div>
      </div>

      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}
    </>
  );
};

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  expanded: boolean;
  disabled?: boolean;
  shortcut?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  onClick,
  expanded,
  disabled = false,
  shortcut
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center px-3 py-2.5 rounded-md transition-colors
                ${expanded ? 'justify-start' : 'justify-center'}
                ${disabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'}`}
      title={expanded ? undefined : label}
    >
      <span className={`${expanded ? 'mr-3' : ''}`}>{icon}</span>
      {expanded && (
        <div className="flex justify-between w-full">
          <span>{label}</span>
          {shortcut && <span className="text-xs text-gray-500 ml-2">{shortcut}</span>}
        </div>
      )}
    </button>
  );
};