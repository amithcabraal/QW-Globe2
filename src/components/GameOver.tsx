import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { Country, GameStats } from '../types/country';
import ShareButton from './ShareButton';
import ScoreDisplay from './ScoreDisplay';

interface GameOverProps {
  won: boolean;
  country: Country;
  stats: GameStats;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ won, country, stats, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {won ? '🎉 Congratulations!' : '😔 Game Over'}
        </h2>
        
        <p className="text-center mb-4">
          {won 
            ? `You guessed ${country.name} in ${stats.attempts} ${stats.attempts === 1 ? 'try' : 'tries'}!` 
            : `The country was ${country.name}`}
        </p>

        <ScoreDisplay score={stats.score} className="justify-center mb-6" />
        
        <div className="space-y-2 mb-6">
          <p className="text-gray-300">Country details:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            <li>Capital: {country.capital}</li>
            <li>Population: {new Intl.NumberFormat().format(country.population)}</li>
            <li>Main Export: {country.mainExport}</li>
          </ul>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Play Again
        </button>

        <ShareButton stats={stats} countryName={country.name} />
      </div>
    </motion.div>
  );
};

export default GameOver;