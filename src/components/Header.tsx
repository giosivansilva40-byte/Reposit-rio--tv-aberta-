import React from 'react';

interface HeaderProps {
  mode: 'tv' | 'radio';
  onModeChange: (mode: 'tv' | 'radio') => void;
  onShareClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ mode, onModeChange, onShareClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black to-transparent border-b border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          {/* Logo e Título */}
          <div className="flex items-center gap-3">
            <div className="text-4xl font-black text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              ▶
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(34,197,94,0.3)] leading-tight">
                RIO TV ABERTA
              </h1>
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest">
                TRANSMISSÃO PROFISSIONAL COM IA
              </p>
            </div>
          </div>

          {/* Modo Toggle */}
          <div className="flex gap-2 bg-black/50 border border-green-500/50 rounded-lg p-1">
            <button
              onClick={() => onModeChange('tv')}
              className={`px-4 py-2 font-bold text-sm uppercase transition-all ${
                mode === 'tv'
                  ? 'bg-green-500 text-black drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                  : 'text-green-400 hover:text-green-300'
              }`}
            >
              📺 TV ABERTA
            </button>
            <button
              onClick={() => onModeChange('radio')}
              className={`px-4 py-2 font-bold text-sm uppercase transition-all ${
                mode === 'radio'
                  ? 'bg-green-500 text-black drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                  : 'text-green-400 hover:text-green-300'
              }`}
            >
              📻 RÁDIO ABERTA
            </button>
          </div>

          {/* Botão Compartilhar */}
          <button
            onClick={onShareClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-black font-bold text-sm uppercase rounded-lg hover:from-green-500 hover:to-green-400 transition-all drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
          >
            🔗 COMPARTILHAR
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-center mt-4 text-xs font-bold text-green-400/70 uppercase tracking-widest">
          HTTP://RIOTVABERTA.COM.BR
        </p>
      </div>
    </div>
  );
};