import React from 'react';
import { FormationType } from '../types';

interface FormationSelectorProps {
  formations: string[];
  currentFormation: FormationType;
  onSelectFormation: (formation: FormationType) => void;
}

const FormationSelector: React.FC<FormationSelectorProps> = ({
  formations,
  currentFormation,
  onSelectFormation
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Select Formation</h2>
      <div className="flex flex-wrap gap-2">
        {formations.map((formation) => (
          <button
            key={formation}
            onClick={() => onSelectFormation(formation as FormationType)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentFormation === formation
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {formation}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormationSelector;