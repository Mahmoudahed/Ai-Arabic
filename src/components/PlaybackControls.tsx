import React from 'react';
import { Button } from './ui/button';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';

interface PlaybackControlsProps {
  onPlay: () => void;
  onStop: () => void;
  isPlaying: boolean;
  disabled: boolean;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  onPlay,
  onStop,
  isPlaying,
  disabled
}) => {
  return (
    <div className="flex justify-center gap-3">
      <Button
        onClick={onPlay}
        disabled={disabled || isPlaying}
        className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-purple-500/50 transition-all duration-300"
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 animate-pulse" />
        ) : (
          <Play className="h-5 w-5" />
        )}
        {isPlaying ? 'Reading...' : 'Read Text'}
      </Button>
      <Button
        onClick={onStop}
        disabled={!isPlaying}
        variant="outline"
        className="gap-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300"
      >
        <Square className="h-5 w-5" />
        Stop
      </Button>
    </div>
  );
};

export default PlaybackControls;
