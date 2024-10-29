export const CLUE_POINTS = {
  flag: 100,
  population: 75,
  capital: 50,
  export: 25,
  map: 75,
  funFact: 50
} as const;

export const calculateScore = (cluesRevealed: number, attempts: number): number => {
  const baseScore = 500;
  const cluesPenalty = cluesRevealed * 50;
  const attemptsPenalty = (attempts - 1) * 25;
  
  return Math.max(0, baseScore - cluesPenalty - attemptsPenalty);
};