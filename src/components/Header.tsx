import React from 'react';
import { Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
        <Globe className="w-8 h-8 mr-2 text-blue-400" />
        <h1 className="text-3xl font-bold tracking-wider">QuizWordz Globe</h1>
      </div>
    </header>
  );
};

export default Header;