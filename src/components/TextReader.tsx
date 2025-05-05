'use client'

import React, { useState, useEffect } from 'react';
import TextInput from './TextInput2';
import VoiceSelector from './VoiceSelector';
import PlaybackControls from './PlaybackControls';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { FileText, Download, Volume2, VolumeX, Play, Pause, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpeechDownload } from '@/hooks/useSpeechDownload';
import { Textarea } from '@/components/ui/textarea';

const TextReader = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

  const {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    setAudioURL,
  } = useSpeechDownload();

  const handleSpeak = () => {
    if (text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = rate;
      synth.speak(utterance);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  const handleRateChange = (value: number[]) => {
    setRate(value[0]);
  };

  const handleDownload = async () => {
    if (!text || !voice) return;
    setAudioURL(null);
    const { utter, stopRecording } = await startRecording();
    utter.text = text;
    utter.voice = voice;
    utter.rate = rate;
    utter.onend = () => {
      stopRecording();
    };
    const synth = window.speechSynthesis;
    synth.speak(utter);
  };

  if (!supported) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900">
        <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl">
          <VolumeX className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 font-medium">
            Your browser does not support the Web Speech API. Please try a different browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 p-4">
      <Card className="w-full max-w-3xl shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
              <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Text Whisperer
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <TextInput 
            value={text} 
            onChange={setText} 
            label="Enter or paste text to be read"
            placeholder="Type or paste your text here..."
            maxLength={5000}
          />
          
          <div className="space-y-4">
            <VoiceSelector 
              voices={voices} 
              selectedVoice={voice}
              onVoiceChange={setVoice}
            />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Reading Speed: {rate.toFixed(1)}x
                </span>
              </div>
              <Slider 
                defaultValue={[1]} 
                max={2} 
                min={0.5} 
                step={0.1}
                onValueChange={handleRateChange}
                className="[&_[role=slider]]:bg-indigo-600 [&_[role=slider]]:dark:bg-indigo-400"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <PlaybackControls 
                onPlay={handleSpeak} 
                onStop={handleStop} 
                isPlaying={speaking}
                disabled={!text.trim()}
              />
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="gap-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
              >
                <Download className="h-4 w-4" />
                Download Audio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextReader;
