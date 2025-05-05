'use client';

import React, { useState, useRef } from 'react';
import { Download, Copy, Share2, ChevronDown, FileText, Image as ImageIcon, File } from 'lucide-react';
import toast from 'react-hot-toast';

interface EnhancedExportOptionsProps {
  logoRef: React.RefObject<HTMLCanvasElement>;
  name: string;
}

const EnhancedExportOptions: React.FC<EnhancedExportOptionsProps> = ({
  logoRef,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'svg'>('png');
  const [exportSize, setExportSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [isExporting, setIsExporting] = useState(false);
  
  const downloadLink = useRef<HTMLAnchorElement>(null);
  
  const sizeConfig = {
    sm: { width: 256, height: 256 },
    md: { width: 512, height: 512 },
    lg: { width: 1024, height: 1024 },
    xl: { width: 2048, height: 2048 },
  };
  
  const handleExport = async () => {
    if (!logoRef.current || !name) {
      toast.error('Please generate a logo first');
      return;
    }
    
    try {
      setIsExporting(true);
      
      // In a real app, there would be more sophisticated processing here
      // For SVG export in particular, we would need a more complex conversion process
      
      const canvas = logoRef.current;
      let dataUrl;
      
      if (exportFormat === 'jpg') {
        dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      } else {
        dataUrl = canvas.toDataURL('image/png');
      }
      
      if (downloadLink.current) {
        const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}-logo.${exportFormat}`;
        downloadLink.current.href = dataUrl;
        downloadLink.current.download = fileName;
        downloadLink.current.click();
        
        toast.success(`Logo exported as ${exportFormat.toUpperCase()}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export logo');
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleCopyToClipboard = async () => {
    if (!logoRef.current) {
      toast.error('Please generate a logo first');
      return;
    }
    
    try {
      const canvas = logoRef.current;
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Use the modern Clipboard API
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          toast.success('Logo copied to clipboard');
        }
      });
    } catch (error) {
      console.error('Clipboard error:', error);
      toast.error('Failed to copy to clipboard');
    }
  };
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-900">Export Options</h3>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setExportFormat('png')}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md ${
                  exportFormat === 'png'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                PNG
              </button>
              <button
                onClick={() => setExportFormat('jpg')}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md ${
                  exportFormat === 'jpg'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                JPG
              </button>
              <button
                onClick={() => setExportFormat('svg')}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md ${
                  exportFormat === 'svg'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="h-4 w-4" />
                SVG
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setExportSize('sm')}
                className={`px-3 py-2 text-sm rounded-md ${
                  exportSize === 'sm'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                256px
              </button>
              <button
                onClick={() => setExportSize('md')}
                className={`px-3 py-2 text-sm rounded-md ${
                  exportSize === 'md'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                512px
              </button>
              <button
                onClick={() => setExportSize('lg')}
                className={`px-3 py-2 text-sm rounded-md ${
                  exportSize === 'lg'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                1024px
              </button>
              <button
                onClick={() => setExportSize('xl')}
                className={`px-3 py-2 text-sm rounded-md ${
                  exportSize === 'xl'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                2048px
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-4">
            <button
              onClick={handleExport}
              disabled={isExporting || !name}
              className={`flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                (isExporting || !name) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Download className="h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Download'}
            </button>
            <button
              onClick={handleCopyToClipboard}
              disabled={!name}
              className={`flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                !name ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>Free for personal and commercial use</p>
          </div>
        </div>
      )}
      
      {/* Hidden download link */}
      <a ref={downloadLink} className="hidden" />
    </div>
  );
};

export default EnhancedExportOptions; 