export interface Country {
  name: string;
  flag: string;
  population: number;
  capital: string;
  mainExport: string;
  code: string;
  funFact: string;
  aliases?: string[];
}

export interface Clue {
  type: 'flag' | 'population' | 'capital' | 'export' | 'map' | 'funFact';
  revealed: boolean;
  points: number;
}

export interface GameStats {
  attempts: number;
  score: number;
  cluesRevealed: number;
  won: boolean;
  elapsedTime: number;
}