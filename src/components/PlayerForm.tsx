import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { X, Upload } from 'lucide-react';

interface PlayerFormProps {
  player: Player | null;
  onUpdatePlayer: (player: Player) => void;
  onClose: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, onUpdatePlayer, onClose }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState(0);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (player) {
      setName(player.name);
      setImageUrl(player.imageUrl || '');
      setJerseyNumber(player.jerseyNumber);
      setRole(player.position.role);
    }
  }, [player]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player) {
      onUpdatePlayer({
        ...player,
        name,
        imageUrl: imageUrl || undefined,
        jerseyNumber,
        position: {
          ...player.position,
          role
        }
      });
    }
  };

  if (!player) return null;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md relative">
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
      
      <h2 className="text-lg font-semibold mb-3">Edit Player</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Player Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Enter player name"
          />
        </div>
        
        <div>
          <label htmlFor="jerseyNumber" className="block text-sm font-medium text-gray-700">
            Jersey Number
          </label>
          <input
            type="number"
            id="jerseyNumber"
            value={jerseyNumber}
            onChange={(e) => setJerseyNumber(parseInt(e.target.value) || 0)}
            min="1"
            max="99"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
        
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            id="position"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="GK">Goalkeeper (GK)</option>
            <option value="LB">Left Back (LB)</option>
            <option value="CB">Center Back (CB)</option>
            <option value="RB">Right Back (RB)</option>
            <option value="LWB">Left Wing Back (LWB)</option>
            <option value="RWB">Right Wing Back (RWB)</option>
            <option value="CDM">Defensive Midfielder (CDM)</option>
            <option value="CM">Central Midfielder (CM)</option>
            <option value="CAM">Attacking Midfielder (CAM)</option>
            <option value="LM">Left Midfielder (LM)</option>
            <option value="RM">Right Midfielder (RM)</option>
            <option value="LW">Left Winger (LW)</option>
            <option value="RW">Right Winger (RW)</option>
            <option value="CF">Center Forward (CF)</option>
            <option value="ST">Striker (ST)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Player Image URL
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="block w-full flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="https://example.com/player-image.jpg"
            />
          </div>
          <div className="mt-2 flex items-center">
            <span className="mr-2 text-sm text-gray-500">Or upload image:</span>
            <label className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer">
              <Upload size={16} className="mr-1" />
              <span className="text-sm">Choose file</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // In a real app, this would upload to a server and return a URL
                    // For now, we'll just create a local object URL
                    const url = URL.createObjectURL(e.target.files[0]);
                    setImageUrl(url);
                  }
                }}
              />
            </label>
          </div>
        </div>
        
        {imageUrl && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">Preview:</p>
            <div className="mt-1 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={imageUrl}
                alt="Player preview"
                className="w-full h-full object-cover"
                onError={() => setImageUrl('')} // Clear URL if image fails to load
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;