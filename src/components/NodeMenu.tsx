import React from 'react';
import { Edit2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface NodeMenuProps {
  onAddChild: (e: React.MouseEvent) => void;
  onAddImage: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  canDelete: boolean;
}

export const NodeMenu: React.FC<NodeMenuProps> = ({
  onAddChild,
  onAddImage,
  onEdit,
  onDelete,
  canDelete
}) => {
  return (
    <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
      <button
        onClick={onAddChild}
        className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        <Plus size={14} className="mr-2 text-blue-500" />
        Add child
      </button>
      
      <button
        onClick={onAddImage}
        className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        <ImageIcon size={14} className="mr-2 text-purple-500" />
        Add image
      </button>
      
      <button
        onClick={onEdit}
        className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        <Edit2 size={14} className="mr-2 text-teal-500" />
        Edit node
      </button>
      
      {canDelete && (
        <button
          onClick={onDelete}
          className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
        >
          <Trash2 size={14} className="mr-2" />
          Delete node
        </button>
      )}
    </div>
  );
};