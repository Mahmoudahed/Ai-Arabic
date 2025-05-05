import React from 'react';
import { Download } from 'lucide-react';

interface ExportOptionsProps {
  onExport: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ onExport }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onExport}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        <Download size={16} className="mr-2" />
        Export Logo
      </button>
      <p className="mt-2 text-xs text-gray-500 text-center">
        Exports your logo as PNG image
      </p>
    </div>
  );
};

export default ExportOptions;