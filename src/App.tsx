import React, { useState, useCallback, useEffect } from 'react';
import { countries } from './data/countries';
import type { Country, Clue, GameStats } from './types/country';
import { Header } from './components/Header';
import { ClueCard } from './components/ClueCard';
import { GuessInput } from './components/GuessInput';
import { GameOver } from './components/GameOver';
import { ScoreDisplay } from './components/ScoreDisplay';
import { CLUE_POINTS, calculateScore } from './utils/scoring';
import { getRandomCountry } from './utils/countrySelection';

export const App: React.FC = () => {
  const [usedCountries, setUsedCountries] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('usedCountries');
    return stored ? new Set(JSON.parse(stored)) : new Set<string>();
  });

  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [country] = useState<Country>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('c');
    if (shareId) {
      window.history.replaceState({}, '', window.location.pathname);
    }
    return getRandomCountry(usedCountries, countries, shareId);
  });
  
  const [clues, setClues] = useState<Clue[]>([
    { type: 'flag', revealed: false, points: CLUE_POINTS.flag },
    { type: 'map', revealed: false, points: CLUE_POINTS.map },
    { type: 'population', revealed: false, points: CLUE_POINTS.population },
    { type: 'capital', revealed: false, points: CLUE_POINTS.capital },
    { type: 'export', revealed: false, points: CLUE_POINTS.export },
    { type: 'funFact', revealed: false, points: CLUE_POINTS.funFact }
  ]);
  
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(500);

  useEffect(() => {
    if (gameOver && won) {
      const newUsedCountries = new Set(usedCountries).add(country.name);
      setUsedCountries(newUsedCountries);
      localStorage.setItem('usedCountries', JSON.stringify([...newUsedCountries]));
      setElapsedTime((Date.now() - startTime) / 1000);
    }
  }, [gameOver, won, country.name, usedCountries, startTime]);

  const handleRevealClue = (index: number) => {
    if (gameOver) return;
    
    setClues(prev => prev.map((clue, i) => 
      i === index ? { ...clue, revealed: true } : clue
    ));
    
    setScore(prev => prev - clues[index].points);
  };

  const handleGuess = useCallback((guess: string) => {
    const normalizedGuess = guess.toLowerCase();
    const normalizedCountry = country.name.toLowerCase();
    
    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    if (normalizedGuess === normalizedCountry) {
      const finalScore = calculateScore(
        clues.filter(c => c.revealed).length,
        newAttempts.length
      );
      setScore(finalScore);
      setWon(true);
      setGameOver(true);
    } else if (newAttempts.length >= 6 || clues.every(c => c.revealed)) {
      setScore(0);
      setGameOver(true);
    }
  }, [attempts, country.name, clues]);

  const getGameStats = (): GameStats => ({
    attempts: attempts.length,
    score,
    cluesRevealed: clues.filter(c => c.revealed).length,
    won,
    elapsedTime
  });

  const restartGame = () => {
    window.location.reload();
  };

  const getClueContent = (type: string) => {
    switch (type) {
      case 'flag': return country.flag;
      case 'population': return country.population;
      case 'capital': return country.capital;
      case 'export': return country.mainExport;
      case 'funFact': return country.funFact;
      case 'map': return '';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-400">
            Attempts: {attempts.length}/6
          </div>
          <ScoreDisplay score={score} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {clues.map((clue, index) => (
            <ClueCard
              key={clue.type}
              type={clue.type}
              content={getClueContent(clue.type)}
              revealed={clue.revealed}
              points={clue.points}
              onClick={() => handleRevealClue(index)}
              countryCode={country.code}
            />
          ))}
        </div>

        {attempts.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {attempts.map((attempt, i) => (
              <span key={i} className="px-2 py-1 bg-gray-700 rounded text-sm">
                {attempt}
              </span>
            ))}
          </div>
        )}

        <GuessInput 
          onGuess={handleGuess}
          disabled={gameOver}
          previousGuesses={attempts}
        />
      </main>

      {gameOver && (
        <GameOver
          won={won}
          country={country}
          stats={getGameStats()}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default App;