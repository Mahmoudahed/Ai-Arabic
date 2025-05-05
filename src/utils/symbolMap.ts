// Special symbols for last letters (using emoji symbols for simplicity)
const lastLetterSymbolMap: Record<string, { symbol: string; name: string; meaning: string }> = {
  'A': { 
    symbol: '🦅', 
    name: 'Eagle', 
    meaning: 'Freedom and perspective' 
  },
  'B': { 
    symbol: '🐻', 
    name: 'Bear', 
    meaning: 'Strength and courage' 
  },
  'C': { 
    symbol: '🐱', 
    name: 'Cat', 
    meaning: 'Independence and mystery' 
  },
  'D': { 
    symbol: '🐉', 
    name: 'Dragon', 
    meaning: 'Power and good fortune' 
  },
  'E': { 
    symbol: '🦊', 
    name: 'Fox', 
    meaning: 'Wisdom and cleverness' 
  },
  'F': { 
    symbol: '🐸', 
    name: 'Frog', 
    meaning: 'Transformation and luck' 
  },
  'G': { 
    symbol: '🦒', 
    name: 'Giraffe', 
    meaning: 'Vision and intuition' 
  },
  'H': { 
    symbol: '🦔', 
    name: 'Hedgehog', 
    meaning: 'Protection and resourcefulness' 
  },
  'I': { 
    symbol: '🦉', 
    name: 'Owl', 
    meaning: 'Wisdom and knowledge' 
  },
  'J': { 
    symbol: '🐆', 
    name: 'Jaguar', 
    meaning: 'Confidence and leadership' 
  },
  'K': { 
    symbol: '🦘', 
    name: 'Kangaroo', 
    meaning: 'Progress and protection' 
  },
  'L': { 
    symbol: '🦁', 
    name: 'Lion', 
    meaning: 'Courage and strength' 
  },
  'M': { 
    symbol: '🐒', 
    name: 'Monkey', 
    meaning: 'Playfulness and adaptability' 
  },
  'N': { 
    symbol: '🦢', 
    name: 'Swan', 
    meaning: 'Grace and beauty' 
  },
  'O': { 
    symbol: '🦉', 
    name: 'Owl', 
    meaning: 'Wisdom and patience' 
  },
  'P': { 
    symbol: '🐧', 
    name: 'Penguin', 
    meaning: 'Resilience and community' 
  },
  'Q': { 
    symbol: '🦜', 
    name: 'Parrot', 
    meaning: 'Communication and color' 
  },
  'R': { 
    symbol: '🦊', 
    name: 'Fox', 
    meaning: 'Adaptability and intelligence' 
  },
  'S': { 
    symbol: '🐍', 
    name: 'Snake', 
    meaning: 'Rebirth and transformation' 
  },
  'T': { 
    symbol: '🐯', 
    name: 'Tiger', 
    meaning: 'Power and passion' 
  },
  'U': { 
    symbol: '🦄', 
    name: 'Unicorn', 
    meaning: 'Magic and wonder' 
  },
  'V': { 
    symbol: '🦅', 
    name: 'Vulture', 
    meaning: 'Patience and cleansing' 
  },
  'W': { 
    symbol: '🐺', 
    name: 'Wolf', 
    meaning: 'Loyalty and intuition' 
  },
  'X': { 
    symbol: '🐂', 
    name: 'Ox', 
    meaning: 'Strength and determination' 
  },
  'Y': { 
    symbol: '🦬', 
    name: 'Bison', 
    meaning: 'Abundance and manifestation' 
  },
  'Z': { 
    symbol: '🦓', 
    name: 'Zebra', 
    meaning: 'Individuality and balance' 
  }
};

// Get the symbol for the last letter
export const getSymbolForLastLetter = (letter: string) => {
  return lastLetterSymbolMap[letter] || {
    symbol: '⭐', 
    name: 'Star',
    meaning: 'Hope and guidance'
  };
};