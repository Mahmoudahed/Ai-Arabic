// Text manipulation utilities

// Abbreviate text according to rules:
// - If ≤10 chars: 2 letter abbreviation
// - If >10 chars: 3 letter abbreviation
export const abbreviateText = (text: string): string => {
  if (!text) return '';
  
  // Remove any spaces or special characters
  const cleanText = text.replace(/[^a-zA-Z0-9]/g, '');
  
  // If the text is 10 characters or less, take first and last
  if (cleanText.length <= 10) {
    return cleanText.length < 2 
      ? cleanText.toUpperCase() 
      : (cleanText[0] + cleanText[cleanText.length - 1]).toUpperCase();
  }
  
  // If the text is more than 10 characters, take first, middle, and last
  const middle = Math.floor(cleanText.length / 2);
  return (cleanText[0] + cleanText[middle] + cleanText[cleanText.length - 1]).toUpperCase();
};

// Get character at specific position (with wraparound if needed)
export const getCharAtPosition = (text: string, position: number): string => {
  if (!text || text.length === 0) return '';
  
  // Use modulo to ensure we always get a valid index even if position > text.length
  const index = position % text.length;
  return text[index] || '';
};

// Get first character of text
export const getFirstChar = (text: string): string => {
  return text && text.length > 0 ? text[0] : '';
};

// Get last character of text
export const getLastChar = (text: string): string => {
  return text && text.length > 0 ? text[text.length - 1] : '';
};

// Validate text input: max 15 characters
export const validateText = (text: string): boolean => {
  return text.length <= 15;
};