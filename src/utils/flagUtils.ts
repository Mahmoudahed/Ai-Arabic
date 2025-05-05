import { getColorForLetter, getMeaningForColor } from './colorMap';
import { getSymbolForLastLetter } from './symbolMap';
import { getRandomPattern } from './patternUtils';

export const generateFlagData = (name: string) => {
  if (!name) return null;

  // Create color stripes for each letter
  const stripes = name.split('').map((letter, index) => {
    const upperLetter = letter.toUpperCase();
    const color = getColorForLetter(upperLetter);
    
    return {
      letter: upperLetter,
      color,
      meaning: getMeaningForColor(color),
      pattern: getRandomPattern()
    };
  });

  // Get special symbol for the last letter
  const lastLetter = name.charAt(name.length - 1).toUpperCase();
  const lastSymbol = getSymbolForLastLetter(lastLetter);

  // Generate an overall meaning
  const traits = stripes.map(stripe => stripe.meaning.split(' ')[0].toLowerCase());
  const uniqueTraits = [...new Set(traits)];
  const selectedTraits = uniqueTraits.slice(0, 3);
  
  const overallMeaning = selectedTraits.length > 1 
    ? `${selectedTraits.slice(0, -1).join(', ')} and ${selectedTraits.slice(-1)}`
    : selectedTraits[0] || 'uniqueness';

  return {
    stripes,
    lastSymbol,
    overallMeaning
  };
};