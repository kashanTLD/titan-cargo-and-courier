import React from 'react';
import { ThemeData } from '@/types/template';

interface LoadingScreenProps {
  theme?: ThemeData;
}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Simple spinner */}
        <div className="w-16 h-16 mx-auto mb-8 relative">
          <div className="absolute inset-0 border-2 border-gray-800 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <h1 className="text-2xl font-light text-white tracking-widest mb-4">
          Loading
        </h1>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
