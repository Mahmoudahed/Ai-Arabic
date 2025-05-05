import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  isExpanded,
  onToggleExpand
}) => {
  const [text, setText] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newText = text.substring(0, start) + "  " + text.substring(end);
      
      setText(newText);
      onChange(newText);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleToggleClick = () => {
    onToggleExpand();
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">
          Mind Map Text
        </h3>
        <button
          onClick={handleToggleClick}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[300px]' : 'max-h-0'} overflow-hidden`}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your mind map structure here...&#10;Each line becomes a node&#10;Use indentation (2 spaces or tab) to create hierarchy"
          className="w-full p-3 text-sm text-gray-800 font-mono resize-none focus:outline-none min-h-[100px]"
          spellCheck={false}
        />
      </div>
    </div>
  );
};