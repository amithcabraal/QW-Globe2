import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoreDisplayProps {
  score: number;
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, className = '' }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <Trophy className="w-5 h-5 text-yellow-400" />
      <span className="font-bold">{score}</span>
      <span className="text-gray-400">points</span>
    </motion.div>
  );
};

export default ScoreDisplay;