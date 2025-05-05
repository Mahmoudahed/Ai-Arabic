import React from 'react';

interface FlagInfoProps {
  flagData: any;
  name: string;
}

export const FlagInfo: React.FC<FlagInfoProps> = ({ flagData, name }) => {
  if (!flagData) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Flag Information</h3>
        <p className="text-gray-600">Enter your name to see the meaning behind your flag.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md h-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Flag Meaning</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Colors</h4>
          <div className="space-y-2">
            {flagData.stripes.map((stripe: any, index: number) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-6 h-6 rounded mr-3" 
                  style={{ backgroundColor: stripe.color }}
                />
                <span className="text-sm font-medium">
                  <span className="text-gray-800">{name[index] || ''}:</span>{' '}
                  <span className="text-gray-600">{stripe.meaning}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {flagData.lastSymbol && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Special Symbol</h4>
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded mr-3">
                <span className="text-xl">{flagData.lastSymbol.symbol}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {flagData.lastSymbol.name}
                </p>
                <p className="text-sm text-gray-600">
                  {flagData.lastSymbol.meaning}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Overall Meaning</h4>
          <p className="text-sm text-gray-600">
            The flag for "{name}" represents {flagData.overallMeaning}. It's as unique as your name!
          </p>
        </div>
      </div>
    </div>
  );
};