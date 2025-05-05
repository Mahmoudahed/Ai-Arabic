import React, { useState, useRef, useEffect } from 'react';
import { Player as PlayerType } from '../types';
import { UserCircle } from 'lucide-react';

interface PlayerProps {
  player: PlayerType;
  onDragStart: (id: number) => void;
  onDragEnd: (id: number, x: number, y: number) => void;
  onSelect: (player: PlayerType) => void;
  isSelected: boolean;
}

const Player: React.FC<PlayerProps> = ({ 
  player, 
  onDragStart, 
  onDragEnd, 
  onSelect,
  isSelected 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fieldRef.current = document.querySelector('.field-container');
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'mousedown') {
      (e as React.MouseEvent).preventDefault();
    }
    setIsDragging(true);
    onDragStart(player.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handlePlayerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(player);
  };

  return (
    <div
      ref={playerRef}
      className={`absolute cursor-grab transition-transform duration-300 ${
        isDragging ? 'cursor-grabbing z-50' : 'z-10'
      } ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 scale-110' : ''}`}
      style={{
        left: `${player.position.x}%`,
        top: `${player.position.y}%`,
        transform: 'translate(-50%, -50%)',
        touchAction: 'none'
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={handlePlayerClick}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
          {player.imageUrl ? (
            <img
              src={player.imageUrl}
              alt={player.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <UserCircle className="w-8 h-8" />
          )}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border border-white">
            {player.jerseyNumber}
          </span>
        </div>
        <div className="mt-1 bg-black bg-opacity-70 px-2 py-0.5 rounded text-white text-xs whitespace-nowrap">
          {player.name}
        </div>
        <div className="text-xs text-white bg-blue-700 px-1 rounded-sm">
          {player.position.role}
        </div>
      </div>
    </div>
  );
};

export default Player;