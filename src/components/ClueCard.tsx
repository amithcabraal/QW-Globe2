import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Users, Building2, Container, Map, Info, X } from 'lucide-react';

interface ClueCardProps {
  type: string;
  content: string | number;
  revealed: boolean;
  points: number;
  onClick: () => void;
  countryCode?: string;
}

export const ClueCard: React.FC<ClueCardProps> = ({ type, content, revealed, points, onClick, countryCode }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const formatContent = (type: string, content: string | number) => {
    if (type === 'population') {
      return `${new Intl.NumberFormat().format(content as number)} people`;
    }
    return content;
  };

  const getIcon = () => {
    switch (type) {
      case 'flag': return <Flag className="w-6 h-6" />;
      case 'population': return <Users className="w-6 h-6" />;
      case 'capital': return <Building2 className="w-6 h-6" />;
      case 'export': return <Container className="w-6 h-6" />;
      case 'map': return <Map className="w-6 h-6" />;
      case 'funFact': return <Info className="w-6 h-6" />;
      default: return null;
    }
  };

  const getMapUrl = (code: string) => {
    return `https://vemaps.com/uploads/img/large/${code.toLowerCase()}-01.jpg`;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!revealed) {
      onClick();
    } else if (type === 'flag' || type === 'map') {
      e.stopPropagation();
      setIsZoomed(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full"
      >
        <button
          onClick={handleClick}
          className={`w-full p-4 rounded-lg ${
            revealed 
              ? 'bg-blue-600' 
              : 'bg-gray-700 hover:bg-gray-600'
          } transition-colors duration-200 flex flex-col items-center justify-center min-h-[160px]`}
        >
          {revealed ? (
            <>
              {(type === 'flag' || type === 'map') ? (
                <div className="w-full h-32 relative mb-2 cursor-zoom-in">
                  <img 
                    src={type === 'map' ? getMapUrl(countryCode!) : content as string} 
                    alt={type === 'map' ? "Country Map" : "Country Flag"}
                    className="w-full h-full object-contain rounded-md"
                    loading="lazy"
                  />
                </div>
              ) : (
                <>
                  {getIcon()}
                  <div className="text-lg font-semibold text-center mt-2">
                    {formatContent(type, content)}
                  </div>
                </>
              )}
              <div className="mt-2 text-sm text-gray-300 uppercase tracking-wide">
                {type === 'funFact' ? 'Fun Fact' : type}
              </div>
            </>
          ) : (
            <>
              {getIcon()}
              <div className="text-base font-medium text-gray-300 mt-2">
                Reveal {type === 'funFact' ? 'Fun Fact' : type}
              </div>
              <div className="mt-2 text-sm text-yellow-400">
                -{points} points
              </div>
            </>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={type === 'map' ? getMapUrl(countryCode!) : content as string}
                alt={type === 'map' ? "Country Map" : "Country Flag"}
                className="max-w-full max-h-full object-contain"
                style={{ touchAction: 'pinch-zoom' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClueCard;