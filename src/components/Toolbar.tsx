import React from "react";
import { 
  Undo2, 
  Redo2, 
  Download, 
  HelpCircle, 
  Code,
  Zap,
  Wallet
} from "lucide-react";

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onShowHelp: () => void;
  onToggleTextInput: () => void;
  onWithdraw: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isTextInputExpanded: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  onRedo,
  onExport,
  onShowHelp,
  onToggleTextInput,
  onWithdraw,
  canUndo,
  canRedo,
  isTextInputExpanded
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-1.5 rounded-md ${
            canUndo 
              ? "text-gray-700 hover:bg-gray-100" 
              : "text-gray-400 cursor-not-allowed"
          }`}
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-1.5 rounded-md ${
            canRedo 
              ? "text-gray-700 hover:bg-gray-100" 
              : "text-gray-400 cursor-not-allowed"
          }`}
          title="Redo"
        >
          <Redo2 size={18} />
        </button>
        <div className="mx-1 h-5 border-l border-gray-300"></div>
        <button
          onClick={onExport}
          className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100"
          title="Export as PNG"
        >
          <Download size={18} />
        </button>
        <button
          onClick={onToggleTextInput}
          className={`p-1.5 rounded-md ${
            isTextInputExpanded
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          title="Toggle Text Editor"
        >
          <Code size={18} />
        </button>
        <button
          onClick={onWithdraw}
          className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100"
          title="Withdraw Funds"
        >
          <Wallet size={18} />
        </button>
      </div>
      
      <div className="flex items-center">
        <span className="text-lg font-medium text-gray-800 mr-2">
          Mind Map Creator
        </span>
        <Zap size={20} className="text-blue-500" />
      </div>
      
      <div>
        <button
          onClick={onShowHelp}
          className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100"
          title="Help"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </div>
  );
};