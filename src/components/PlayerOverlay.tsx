import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, StopCircle } from 'lucide-react';

interface PlayerOverlayProps {
  channelName: string;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  volume: number;
  onVolumeChange: (value: number) => void;
  onMute: () => void;
  onStop: () => void;
  isMuted: boolean;
}

export const PlayerOverlay: React.FC<PlayerOverlayProps> = ({
  channelName,
  isPlaying,
  isLoading,
  error,
  volume,
  onVolumeChange,
  onMute,
  onStop,
  isMuted,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Status */}
        <div className="mb-4">
          <h2 className="text-2xl font-black text-green-400 uppercase drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
            {channelName || 'Selecione um canal'}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            {isLoading && <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>}
            {isPlaying && !isLoading && <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
            <span className="text-sm font-bold text-gray-300 uppercase">
              {error ? `❌ ${error}` : isLoading ? '⏳ Conectando...' : isPlaying ? '🟢 AO VIVO' : '⚫ PARADO'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onMute}
              className="p-2 bg-black/50 border border-green-500/50 rounded-lg hover:bg-green-500/20 transition-all"
            >
              {isMuted ? <VolumeX className="text-red-400" size={20} /> : <Volume2 className="text-green-400" size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg appearance-none cursor-pointer accent-green-400"
              />
              <span className="text-xs font-bold text-green-400 w-10">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          <button
            onClick={onStop}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500 text-red-400 font-bold rounded-lg hover:bg-red-600/40 transition-all"
          >
            <StopCircle size={18} /> PARAR
          </button>
        </div>
      </div>
    </div>
  );
};