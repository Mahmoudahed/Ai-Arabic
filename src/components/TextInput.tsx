import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  maxLength = 15,
  placeholder = 'Enter text',
  label,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <span className="text-xs text-gray-500">
          {value.length}/{maxLength}
        </span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default TextInput;