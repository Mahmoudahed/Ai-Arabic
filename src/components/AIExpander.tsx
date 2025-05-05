import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIExpanderProps {
  onExpand: (text: string) => void;
}

export const AIExpander: React.FC<AIExpanderProps> = ({ onExpand }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExpand = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/expand-topic`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to expand topic');
      }

      const data = await response.json();
      onExpand(data.content);
      setTopic('');
    } catch (err) {
      setError('Failed to generate mind map. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-700">AI Mind Map Generator</h3>
      </div>
      
      <div className="space-y-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic to expand..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              handleExpand();
            }
          }}
        />
        
        <button
          onClick={handleExpand}
          disabled={isLoading || !topic.trim()}
          className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium transition-colors
            ${isLoading || !topic.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </span>
          ) : (
            'Generate Mind Map'
          )}
        </button>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};