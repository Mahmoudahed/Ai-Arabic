import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';
import { Player as PlayerType } from '../types';

interface FieldViewProps {
  players: PlayerType[];
  onUpdatePlayer: (updatedPlayer: PlayerType) => void;
  onSelectPlayer: (player: PlayerType | null) => void;
  selectedPlayerId: number | null;
}

const FieldView: React.FC<FieldViewProps> = ({ 
  players, 
  onUpdatePlayer, 
  onSelectPlayer,
  selectedPlayerId 
}) => {
  const [draggedPlayerId, setDraggedPlayerId] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedPlayerId !== null && fieldRef.current) {
        const rect = fieldRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        const player = players.find(p => p.id === draggedPlayerId);
        if (player) {
          const clampedX = Math.max(0, Math.min(100, x));
          const clampedY = Math.max(0, Math.min(100, y));
          
          onUpdatePlayer({
            ...player,
            position: {
              ...player.position,
              x: clampedX,
              y: clampedY
            }
          });
        }
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (draggedPlayerId !== null && fieldRef.current && e.touches[0]) {
        const rect = fieldRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        
        const player = players.find(p => p.id === draggedPlayerId);
        if (player) {
          const clampedX = Math.max(0, Math.min(100, x));
          const clampedY = Math.max(0, Math.min(100, y));
          
          onUpdatePlayer({
            ...player,
            position: {
              ...player.position,
              x: clampedX,
              y: clampedY
            }
          });
        }
      }
    };
    
    const handleMouseUp = () => {
      setDraggedPlayerId(null);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [draggedPlayerId, players, onUpdatePlayer]);
  
  const handleFieldClick = () => {
    onSelectPlayer(null);
  };

  return (
    <div 
      ref={fieldRef} 
      className="field-container relative w-full bg-green-700 rounded-lg overflow-hidden"
      style={{
        aspectRatio: '16/10',
        backgroundImage: `url('https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={handleFieldClick}
    >
      <div className="absolute inset-0 bg-green-700 bg-opacity-30">
        {/* Field markings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[90%] border-2 border-white border-opacity-50 rounded-lg"></div>
        </div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20%] aspect-square rounded-full border-2 border-white border-opacity-50"></div>
        
        {/* Center spot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
        
        {/* Penalty areas */}
        <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[40%] h-[25%] border-2 border-white border-opacity-50"></div>
        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[40%] h-[25%] border-2 border-white border-opacity-50"></div>
        
        {/* Goal areas */}
        <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[20%] h-[10%] border-2 border-white border-opacity-50"></div>
        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[20%] h-[10%] border-2 border-white border-opacity-50"></div>
        
        {/* Goals */}
        <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[10%] h-1 bg-white bg-opacity-70"></div>
        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[10%] h-1 bg-white bg-opacity-70"></div>
      </div>
      
      {players.map(player => (
        <Player
          key={player.id}
          player={player}
          onDragStart={(id) => setDraggedPlayerId(id)}
          onDragEnd={() => setDraggedPlayerId(null)}
          onSelect={onSelectPlayer}
          isSelected={player.id === selectedPlayerId}
        />
      ))}
    </div>
  );
};

export default FieldView;