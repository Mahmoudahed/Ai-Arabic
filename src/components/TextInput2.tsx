import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  maxLength?: number;
  label?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  maxLength = 100,
  label = "Input Text",
  placeholder = "Type or paste your text here..."
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <Label 
          htmlFor="text-input" 
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          {label}
        </Label>
      </div>
      <Textarea
        id="text-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="min-h-[120px] resize-y bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      {maxLength && (
        <div className="text-xs text-gray-500 text-right">
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

export default TextInput;
