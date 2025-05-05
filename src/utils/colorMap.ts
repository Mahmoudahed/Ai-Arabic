// Generate a random hex color
const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Map colors to meanings based on their hue
export const getMeaningForColor = (color: string): string => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  // Determine the dominant color component
  const max = Math.max(r, g, b);
  
  if (r === max) {
    return 'Passion and Energy';
  } else if (g === max) {
    return 'Growth and Harmony';
  } else {
    return 'Wisdom and Depth';
  }
};

// Get a random color for a letter
export const getColorForLetter = (letter: string): string => {
  return generateRandomColor();
};