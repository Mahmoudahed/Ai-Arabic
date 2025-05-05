import React from 'react';
import FormationSelector from './FormationSelector';
import PlayerForm from './PlayerForm';
import { Player, FormationType } from '../types';

interface ControlPanelProps {
  formations: string[];
  currentFormation: FormationType;
  onSelectFormation: (formation: FormationType) => void;
  selectedPlayer: Player | null;
  onUpdatePlayer: (player: Player) => void;
  onClosePlayerForm: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  formations,
  currentFormation,
  onSelectFormation,
  selectedPlayer,
  onUpdatePlayer,
  onClosePlayerForm
}) => {
  return (
    <div className="w-full space-y-4">
      <FormationSelector
        formations={formations}
        currentFormation={currentFormation}
        onSelectFormation={onSelectFormation}
      />
      
      {selectedPlayer && (
        <PlayerForm
          player={selectedPlayer}
          onUpdatePlayer={onUpdatePlayer}
          onClose={onClosePlayerForm}
        />
      )}
      
      {!selectedPlayer && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Instructions</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Drag players to position them on the field</li>
            <li>Click on a player to edit their details</li>
            <li>Select a formation template from above</li>
            <li>Save your formation when complete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;