import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  won: boolean;
  solution: string;
  guesses: string[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ won, solution, guesses, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">
          {won ? 'Congratulations!' : 'Game Over'}
        </h2>
        
        <p className="mb-4">
          {won 
            ? `You won in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}!` 
            : `The word was ${solution}`}
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;