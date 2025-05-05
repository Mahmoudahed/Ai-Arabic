// Color generation utilities

// Generate a random color
export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate a color based on a character
export const getColorFromChar = (char: string): string => {
  if (!char) return '#6366F1'; // Default indigo color
  
  // Convert the character to its ASCII code
  const charCode = char.toLowerCase().charCodeAt(0);
  
  // Create hue based on character code (0-360)
  const hue = (charCode * 15) % 360;
  
  // We'll use HSL for more controlled colors
  // Saturation and lightness are fixed for good readability
  return `hsl(${hue}, 85%, 60%)`;
};

// Generate a contrasting color for text on a given background
export const getContrastColor = (backgroundColor: string): string => {
  // For simplicity, we'll return either black or white based on the perceived brightness
  // For HSL colors, we need to parse them
  if (backgroundColor.startsWith('hsl')) {
    const match = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      const lightness = parseInt(match[3], 10);
      return lightness > 60 ? '#000000' : '#FFFFFF';
    }
  }
  
  // For hex colors
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

// Predefined color palettes
export const colorPalettes = {
  vibrant: [
    '#FF4136', // Red
    '#FF851B', // Orange
    '#FFDC00', // Yellow
    '#2ECC40', // Green
    '#0074D9', // Blue
    '#B10DC9', // Purple
    '#F012BE', // Magenta
    '#01FF70', // Lime
    '#7FDBFF', // Aqua
    '#AAAAAA', // Gray
  ],
  pastel: [
    '#FFD1DC', // Pink
    '#FFB347', // Pastel Orange
    '#FDFD96', // Pastel Yellow
    '#77DD77', // Pastel Green
    '#AEC6CF', // Pastel Blue
    '#B39EB5', // Pastel Purple
    '#FF6961', // Pastel Red
    '#CB99C9', // Pastel Lavender
    '#CFCFC4', // Pastel Gray
    '#FDCBCB', // Pastel Salmon
  ],
  monochrome: [
    '#000000', // Black
    '#333333',
    '#666666',
    '#999999',
    '#CCCCCC',
    '#FFFFFF', // White
  ],
};