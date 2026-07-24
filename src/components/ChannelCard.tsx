import React from 'react';

interface ChannelCardProps {
  id: string;
  name: string;
  logo: string;
  category?: string;
  isActive: boolean;
  onClick: () => void;
  isLoading: boolean;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  id,
  name,
  logo,
  category,
  isActive,
  onClick,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden rounded-lg transition-all duration-300 transform ${
        isActive ? 'scale-105 ring-2 ring-green-400 shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'hover:scale-110'
      }`}
    >
      {/* Card Background */}
      <div className={`aspect-video bg-gradient-to-br from-black to-gray-900 border-2 ${
        isActive ? 'border-green-500' : 'border-green-500/30'
      } flex flex-col items-center justify-center gap-2 p-3 relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="text-4xl mb-2">{logo}</div>
          <h3 className="font-black text-sm text-white uppercase leading-tight drop-shadow-[0_0_5px_rgba(34,197,94,0.3)]">
            {name}
          </h3>
          {category && <p className="text-xs font-bold text-green-400 uppercase mt-1">{category}</p>}
        </div>

        {/* Loading Indicator */}
        {isLoading && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-8 h-8 border-2 border-green-400 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Active Ping */}
        {isActive && (
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
          </div>
        )}
      </div>
    </button>
  );
};