import React from "react";
import { X } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">How to Use Mind Map Creator</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Getting Started</h3>
              <p className="text-gray-600">
                Enter text in the editor panel. Each line becomes a node. Use indentation (spaces or tab) to create hierarchy.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Navigating the Mind Map</h3>
              <ul className="list-disc text-gray-600 pl-5 space-y-1">
                <li>Click and drag the background to pan</li>
                <li>Use the mouse wheel to zoom in/out</li>
                <li>Click on a node to select it</li>
                <li>Drag nodes to reposition them</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Editing Nodes</h3>
              <ul className="list-disc text-gray-600 pl-5 space-y-1">
                <li>Click the pencil icon to edit node text</li>
                <li>Click the plus icon to add a child node</li>
                <li>Click the trash icon to delete a node and its children</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Keyboard Shortcuts</h3>
              <ul className="list-disc text-gray-600 pl-5 space-y-1">
                <li><kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Tab</kbd> Insert indentation in the text editor</li>
                <li><kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/⌘</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Z</kbd> Undo</li>
                <li><kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/⌘</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Shift</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Z</kbd> Redo</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tips</h3>
              <ul className="list-disc text-gray-600 pl-5 space-y-1">
                <li>Start with a main idea at the root</li>
                <li>Create visual hierarchies with indentation</li>
                <li>Use the export button to save your mind map as an image</li>
                <li>Double-click any node to quickly edit its text</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};