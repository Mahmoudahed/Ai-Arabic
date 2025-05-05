import React from 'react';
import { Download, Upload, Save, Camera } from 'lucide-react';
import domtoimage from 'dom-to-image-more';

interface HeaderProps {
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  formationName: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, onExport, onImport, formationName }) => {
  const handleExportImage = async () => {
    const fieldElement = document.querySelector('.field-container');
    if (fieldElement) {
      try {
        const dataUrl = await domtoimage.toPng(fieldElement as HTMLElement, {
          quality: 1,
          bgcolor: '#ffffff',
          style: {
            transform: 'scale(1)',
          },
        });

        const link = document.createElement('a');
        link.download = `formation-${formationName}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error exporting image:', error);
        alert('Failed to export image. Please try again.');
      }
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Football Formation Editor</h1>
          <span className="ml-4 px-2 py-1 bg-blue-900 rounded text-sm">
            {formationName}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            className="flex items-center px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded text-sm font-medium transition-colors"
          >
            <Save size={16} className="mr-1" />
            Save
          </button>
          <button
            onClick={onImport}
            className="flex items-center px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded text-sm font-medium transition-colors"
          >
            <Upload size={16} className="mr-1" />
            Import
          </button>
          <button
            onClick={onExport}
            className="flex items-center px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded text-sm font-medium transition-colors"
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
          <button
            onClick={handleExportImage}
            className="flex items-center px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded text-sm font-medium transition-colors"
          >
            <Camera size={16} className="mr-1" />
            Screenshot
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
