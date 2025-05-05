import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="text-center text-gray-600">
        <p className="flex items-center justify-center">
          Created with <Heart className="h-4 w-4 text-red-500 mx-1" /> in 2025
        </p>
        <p className="text-sm mt-1">
          NameFlag Generator - Create your personal flag from your name
        </p>
      </div>
    </footer>
  );
};