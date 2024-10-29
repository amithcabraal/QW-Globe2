import React from 'react';
import { Delete } from 'lucide-react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  solution: string;
}

const KeyboardComponent: React.FC<KeyboardProps> = ({ onKeyPress, guesses, solution }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  const getKeyStatus = (key: string) => {
    const flatGuesses = guesses.join('');
    if (guesses.some(guess => 
      guess.split('').some((letter, i) => letter === key && solution[i] === letter)
    )) return 'correct';
    if (guesses.some(guess => 
      guess.includes(key) && solution.includes(key)
    )) return 'present';
    if (flatGuesses.includes(key)) return 'absent';
    return 'unused';
  };

  const getKeyStyles = (status: string) => {
    switch (status) {
      case 'correct': return 'bg-green-500 hover:bg-green-600';
      case 'present': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'absent': return 'bg-gray-700 hover:bg-gray-600';
      default: return 'bg-gray-500 hover:bg-gray-400';
    }
  };

  return (
    <div className="grid gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => {
            const status = key.length === 1 ? getKeyStatus(key) : 'unused';
            const width = key.length > 1 ? 'w-16' : 'w-10';
            
            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`${width} h-14 flex items-center justify-center rounded font-bold transition-colors ${getKeyStyles(status)}`}
              >
                {key === 'BACKSPACE' ? <Delete className="w-6 h-6" /> : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KeyboardComponent;