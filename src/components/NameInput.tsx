'use client';

import React from 'react';

interface NameInputProps {
  name: string;
  setName: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({ name, setName }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Enter Name
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your brand or name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        maxLength={10}
      />
      <p className="text-sm text-gray-500">
        {name.length}/10 characters
      </p>
    </div>
  );
};

export default NameInput;