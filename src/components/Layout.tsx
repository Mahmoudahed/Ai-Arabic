import React from 'react';
import { Flag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Flag className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">NameFlag</h1>
          <div className="ml-auto flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Gallery
            </a>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};