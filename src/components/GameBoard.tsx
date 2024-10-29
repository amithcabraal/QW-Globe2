import React from 'react';
import { motion } from 'framer-motion';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses, currentGuess, solution }) => {
  const empties = Array(6 - guesses.length - 1).fill('');
  
  const getBackgroundColor = (letter: string, index: number, guess: string) => {
    if (guess[index] === solution[index]) return 'bg-green-500';
    if (solution.includes(guess[index])) return 'bg-yellow-500';
    return 'bg-gray-700';
  };

  return (
    <div className="grid grid-rows-6 gap-2 mb-8">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {guess.split('').map((letter, j) => (
            <motion.div
              key={j}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`${getBackgroundColor(letter, j, guess)} h-14 w-14 flex items-center justify-center text-2xl font-bold rounded border-2 border-gray-600`}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      ))}
      
      {guesses.length < 6 && (
        <div className="grid grid-cols-5 gap-2">
          {currentGuess.split('').concat(Array(5 - currentGuess.length).fill('')).map((letter, i) => (
            <div
              key={i}
              className={`h-14 w-14 flex items-center justify-center text-2xl font-bold rounded border-2 ${
                letter ? 'border-gray-400' : 'border-gray-700'
              } bg-transparent`}
            >
              {letter}
            </div>
          ))}
        </div>
      )}
      
      {empties.map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, j) => (
            <div
              key={j}
              className="h-14 w-14 flex items-center justify-center text-2xl font-bold rounded border-2 border-gray-800"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;