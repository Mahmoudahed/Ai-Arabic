import React from 'react';
import { X } from 'lucide-react';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ onClose }) => {
  const shortcuts = [
    { key: 'Ctrl/Cmd + N', description: 'Create new mind map' },
    { key: 'Ctrl/Cmd + S', description: 'Save mind map' },
    { key: 'Ctrl/Cmd + Z', description: 'Undo last action' },
    { key: 'Ctrl/Cmd + Y', description: 'Redo last action' },
    { key: 'Ctrl/Cmd + +', description: 'Zoom in' },
    { key: 'Ctrl/Cmd + -', description: 'Zoom out' },
    { key: 'Ctrl/Cmd + 0', description: 'Reset zoom' },
    { key: 'Space + drag', description: 'Pan the canvas' },
    { key: 'Double-click node', description: 'Edit node text' },
    { key: 'Delete/Backspace', description: 'Delete selected node' },
    { key: 'Tab', description: 'Add child to selected node' },
    { key: 'Right-click node', description: 'Open node menu' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <ul className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                  {shortcut.key}
                </span>
                <span className="text-gray-700">{shortcut.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};