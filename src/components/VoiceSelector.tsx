'use client';

import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Label } from './ui/label';
import { Mic } from 'lucide-react';

interface VoiceSelectorProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ 
  voices, 
  selectedVoice, 
  onVoiceChange 
}) => {
  if (!voices || voices.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Mic className="h-4 w-4 loading" />
        <span className="font-medium">Loading available voices...</span>
      </div>
    );
  }

  const handleVoiceChange = (value: string) => {
    const selectedVoice = voices.find(voice => voice.name === value) || null;
    if (selectedVoice) {
      onVoiceChange(selectedVoice);
    }
  };

  // Group voices by language
  const voicesByLang = voices.reduce((acc: Record<string, SpeechSynthesisVoice[]>, voice) => {
    const lang = voice.lang || 'unknown';
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(voice);
    return acc;
  }, {});

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Mic className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <Label 
          htmlFor="voice-selector" 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Voice Selection
        </Label>
      </div>
      <Select.Root 
        value={selectedVoice?.name || ''} 
        onValueChange={handleVoiceChange}
      >
        <Select.Trigger 
          id="voice-selector" 
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm px-3 py-2 text-left flex items-center justify-between"
        >
          <Select.Value placeholder="Select a voice" />
          <Select.Icon>
            <Mic className="h-4 w-4 opacity-50" />
          </Select.Icon>
        </Select.Trigger>
        
        <Select.Portal>
          <Select.Content 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md overflow-hidden max-h-[300px]"
            position="popper"
            sideOffset={5}
          >
            <Select.ScrollUpButton 
              className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
              onClick={(e) => {
                e.preventDefault();
                const viewport = e.currentTarget.nextElementSibling;
                if (viewport) {
                  viewport.scrollTop -= 50;
                }
              }}
            >
              <div className="h-4 w-4 border-t-2 border-gray-500 dark:border-gray-400 rotate-180 transform" />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1 max-h-[250px] overflow-y-auto">
              {Object.entries(voicesByLang).map(([lang, langVoices]) => (
                <Select.Group key={lang}>
                  <Select.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 sticky top-0">
                    {new Intl.DisplayNames([navigator.language], { type: 'language' }).of(lang.split('-')[0]) || lang}
                  </Select.Label>
                  {langVoices.map(voice => (
                    <Select.Item
                      key={voice.name}
                      value={voice.name}
                      className="relative flex items-center px-2 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-default select-none outline-none data-[highlighted]:bg-blue-50 dark:data-[highlighted]:bg-blue-900/50 data-[highlighted]:text-blue-600 dark:data-[highlighted]:text-blue-400"
                    >
                      <Select.ItemText>{voice.name}</Select.ItemText>
                      <Select.ItemIndicator className="absolute right-2 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton 
              className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
              onClick={(e) => {
                e.preventDefault();
                const viewport = e.currentTarget.previousElementSibling;
                if (viewport) {
                  viewport.scrollTop += 50;
                }
              }}
            >
              <div className="h-4 w-4 border-t-2 border-gray-500 dark:border-gray-400 transform" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default VoiceSelector;