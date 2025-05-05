'use client'


import React, { useState, useEffect } from 'react';
import FieldView from '@/components/FieldView';
import ControlPanel from '@/components/ControlPanelFootball';
import Header from '@/components/HeaderFootball';
import { Player, FormationType } from '@/types';
import { formations, defaultPlayers } from '@/data/formations';

function App() {
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);
  const [currentFormation, setCurrentFormation] = useState<FormationType>("4-4-2");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    // Try to load saved formation from localStorage
    const savedFormation = localStorage.getItem('savedFormation');
    const savedPlayers = localStorage.getItem('savedPlayers');
    
    if (savedFormation) {
      setCurrentFormation(savedFormation as FormationType);
    }
    
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch (error) {
        console.error('Failed to parse saved players', error);
      }
    }
  }, []);

  const handleFormationChange = (formation: FormationType) => {
    setCurrentFormation(formation);
    
    // Apply the selected formation's positions to our players
    if (formation !== 'Custom' && formations[formation]) {
      const newPositions = formations[formation].positions;
      const updatedPlayers = players.map((player, index) => ({
        ...player,
        position: {
          ...newPositions[index],
          role: newPositions[index].role // Update role based on formation
        }
      }));
      
      setPlayers(updatedPlayers);
      setSelectedPlayer(null);
    }
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    setPlayers(players.map(player => 
      player.id === updatedPlayer.id ? updatedPlayer : player
    ));
    setSelectedPlayer(updatedPlayer);
  };

  const handleSelectPlayer = (player: Player | null) => {
    setSelectedPlayer(player);
  };

  const handleSaveFormation = () => {
    // Save current formation and players to localStorage
    localStorage.setItem('savedFormation', currentFormation);
    localStorage.setItem('savedPlayers', JSON.stringify(players));
    
    alert('Formation saved successfully!');
  };

  const handleExportFormation = () => {
    // Create a formation export object
    const exportData = {
      formation: currentFormation,
      players: players
    };
    
    // Convert to JSON and create a download link
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `football-formation-${currentFormation}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportFormation = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const result = e.target?.result as string;
            const data = JSON.parse(result);
            
            if (data.formation && data.players && Array.isArray(data.players)) {
              setCurrentFormation(data.formation as FormationType);
              setPlayers(data.players);
              alert('Formation imported successfully!');
            } else {
              throw new Error('Invalid formation data');
            }
          } catch (error) {
            console.error('Error importing formation:', error);
            alert('Failed to import formation. Invalid file format.');
          }
        };
        
        reader.readAsText(file);
      }
    };
    
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        onSave={handleSaveFormation}
        onExport={handleExportFormation}
        onImport={handleImportFormation}
        formationName={currentFormation}
      />
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <FieldView 
              players={players} 
              onUpdatePlayer={handleUpdatePlayer}
              onSelectPlayer={handleSelectPlayer}
              selectedPlayerId={selectedPlayer?.id || null}
            />
          </div>
          
          <div className="lg:col-span-1">
            <ControlPanel 
              formations={Object.keys(formations).concat(['Custom'])}
              currentFormation={currentFormation}
              onSelectFormation={handleFormationChange}
              selectedPlayer={selectedPlayer}
              onUpdatePlayer={handleUpdatePlayer}
              onClosePlayerForm={() => setSelectedPlayer(null)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;