export type PatternType = 'horizontal' | 'vertical' | 'diagonal' | 'triangular' | 'wave';

export interface Pattern {
  type: PatternType;
  rotation?: number;
}

const patterns: PatternType[] = ['horizontal', 'vertical', 'diagonal', 'triangular', 'wave'];

export const getRandomPattern = (): Pattern => {
  const randomType = patterns[Math.floor(Math.random() * patterns.length)];
  const randomRotation = Math.floor(Math.random() * 360);
  
  return {
    type: randomType,
    rotation: randomRotation
  };
};