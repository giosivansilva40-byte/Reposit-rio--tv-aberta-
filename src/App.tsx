import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ChannelCard } from './components/ChannelCard';
import { PlayerOverlay } from './components/PlayerOverlay';
import { AIAssistant } from './components/AIAssistant';
import { usePlayer } from './hooks/usePlayer';
import { channels } from './data/channels';
import { radios } from './data/radios';

function App() {
  const [mode, setMode] = useState<'tv' | 'radio'>('tv');
  const [activeId, setActiveId] = useState(channels[0].id);
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [filterState, setFilterState] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentRef = mode === 'tv' ? videoRef : audioRef;

  const { isPlaying, isLoading, error, volume, play, stop, toggleMute, setVolume } = usePlayer(currentRef, {
    autoplay: true,
  });

  const items = mode === 'tv' ? channels : radios;
  const activeItem = items.find((item) => item.id === activeId);

  useEffect(() => {
    if (activeItem && !isPlaying) {
      play(activeItem.stream, mode === 'radio');
    }
  }, []);

  const handleChannelChange = (id: string) => {
    setActiveId(id);
    const newItem = items.find((item) => item.id === id);
    if (newItem) {
      play(newItem.stream, mode === 'radio');
    }
  };

  const handleModeChange = (newMode: 'tv' | 'radio') => {
    stop();
    setMode(newMode);
    setFilterCategory('Todos');
    setFilterState('Todos');
    setSearchTerm('');
    setActiveId(newMode === 'tv' ? channels[0].id : radios[0].id);

    setTimeout(() => {
      const firstItem = newMode === 'tv' ? channels[0] : radios[0];
      play(firstItem.stream, newMode === 'radio');
    }, 500);
  };

  const handleShare = async () => {
    const text = `🎬 Assista RIO TV ABERTA - TV e Rádios abertas com IA! 📺📻 ${activeItem?.name || ''}\n\n🔗 HTTP://RIOTVABERTA.COM.BR`;

    if (navigator.share) {
      navigator.share({ title: 'Rio TV Aberta', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('🔗 Link copiado para clipboard!');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = mode === 'tv' 
      ? filterCategory === 'Todos' || item.category === filterCategory
      : filterState === 'Todos' || item.state === filterState;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-black to-black" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34,197,94,.1) 25%, rgba(34,197,94,.1) 26%, transparent 27%, transparent 74%, rgba(34,197,94,.1) 75%, rgba(34,197,94,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34,197,94,.1) 25%, rgba(34,197,94,.1) 26%, transparent 27%, transparent 74%, rgba(34,197,94,.1) 75%, rgba(34,197,94,.1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Hidden Media Elements */}
      <video ref={videoRef} className="hidden" controls />
      <audio ref={audioRef} className="hidden" controls />

      {/* Header */}
      <Header mode={mode} onModeChange={handleModeChange} onShareClick={handleShare} />

      {/* Main Content */}
      <div className="pt-32 pb-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={`🔍 Buscar ${mode === 'tv' ? 'canais' : 'rádios'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-green-500 rounded-lg text-white placeholder-gray-500 font-bold uppercase focus:outline-none focus:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
              />
            </div>

            {/* Category/State Filters */}
            <div className="flex flex-wrap gap-2">
              {mode === 'tv' ? (
                <>
                  <span className="text-xs font-bold text-green-400 uppercase py-2">Categoria:</span>
                  {['Todos', 'Educativa', 'Política', 'Infantil', 'Cultura', 'Música', 'Esportes', 'Entretenimento', 'Comédia', 'Documentário'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-2 rounded-lg font-bold text-xs uppercase transition-all ${
                        filterCategory === cat
                          ? 'bg-green-500 text-black drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                          : 'bg-black border border-green-500/50 text-green-400 hover:border-green-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <span className="text-xs font-bold text-green-400 uppercase py-2">Estado:</span>
                  {['Todos', 'SP', 'RJ', 'MG', 'RS', 'BA', 'DF', 'CE', 'PE'].map((state) => (
                    <button
                      key={state}
                      onClick={() => setFilterState(state)}
                      className={`px-3 py-2 rounded-lg font-bold text-xs uppercase transition-all ${
                        filterState === state
                          ? 'bg-green-500 text-black drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                          : 'bg-black border border-green-500/50 text-green-400 hover:border-green-400'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Grid de Canais/Rádios */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <ChannelCard
                key={item.id}
                id={item.id}
                name={item.name}
                logo={item.logo}
                category={'category' in item ? item.category : undefined}
                isActive={activeId === item.id}
                isLoading={isLoading && activeId === item.id}
                onClick={() => handleChannelChange(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Player Overlay */}
      <PlayerOverlay
        channelName={activeItem?.name || ''}
        isPlaying={isPlaying}
        isLoading={isLoading}
        error={error}
        volume={volume}
        onVolumeChange={setVolume}
        onMute={toggleMute}
        onStop={stop}
        isMuted={currentRef.current?.muted ?? false}
      />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}

export default App;