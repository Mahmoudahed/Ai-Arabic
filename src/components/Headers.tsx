import React from 'react';
import { Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layers className="h-8 w-8 text-blue-600" />
          <span className="font-bold text-xl text-gray-800">NameLogo</span>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li className="hidden md:block">
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Examples
              </a>
            </li>
            <li className="hidden md:block">
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <button className="btn btn-primary">
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;