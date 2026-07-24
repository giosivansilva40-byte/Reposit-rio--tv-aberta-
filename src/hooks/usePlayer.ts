import { useState, useEffect, useRef } from 'react';
import HLS from 'hls.js';

interface UsePlayerOptions {
  autoplay?: boolean;
  muted?: boolean;
}

export const usePlayer = (videoRef: React.RefObject<HTMLVideoElement | HTMLAudioElement>, options: UsePlayerOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(1);
  const hlsRef = useRef<HLS | null>(null);

  const play = async (streamUrl: string, isAudio: boolean = false) => {
    if (!videoRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const element = videoRef.current;

      if (HLS.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        hlsRef.current = new HLS({
          enableWorker: true,
          lowLatencyMode: true,
          maxLoadingDelay: 4,
          maxFragLookUpTolerance: 0.25,
          defaultAudioCodec: undefined,
          abrEwmaFastLive: 3,
          abrEwmaSlowLive: 9,
        });

        hlsRef.current.attachMedia(element);
        hlsRef.current.loadSource(streamUrl);

        hlsRef.current.on(HLS.Events.MANIFEST_PARSED, () => {
          element.play().catch(() => {
            element.muted = true;
            element.play().catch((err) => {
              setError('Falha ao iniciar reprodução');
              setIsLoading(false);
            });
          });
        });

        hlsRef.current.on(HLS.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case HLS.ErrorTypes.NETWORK_ERROR:
                setError('Erro de rede. Tentando reconectar...');
                setTimeout(() => hlsRef.current?.startLoad(), 3000);
                break;
              case HLS.ErrorTypes.MEDIA_ERROR:
                setError('Erro de mídia. Recuperando...');
                hlsRef.current?.recoverMediaError();
                break;
              default:
                setError('Erro ao reproduzir stream');
            }
          }
        });
      } else if (element.canPlayType('application/vnd.apple.mpegurl')) {
        element.src = streamUrl;
        element.play().catch(() => {
          element.muted = true;
          element.play();
        });
      }

      setIsPlaying(true);
      setIsLoading(false);
    } catch (err) {
      setError('Falha na reprodução');
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const setPlayerVolume = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  return {
    isPlaying,
    isLoading,
    error,
    volume,
    play,
    stop,
    toggleMute,
    setVolume: setPlayerVolume,
  };
};