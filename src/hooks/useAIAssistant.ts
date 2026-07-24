import { useState, useCallback, useRef } from 'react';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const recognitionAvailable = () => {
  const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  return Boolean(SpeechRecognition);
};

export const useAIAssistant = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o assistente de IA da RIO TV ABERTA. Posso ajudar você a encontrar canais, rádios e controlar a reprodução. Clique no microfone para falar comigo!',
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const processCommand = useCallback((text: string): { action: string; target?: string; value?: string } => {
    const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (lower.includes('proxim') || lower.includes('proximo')) return { action: 'next' };
    if (lower.includes('anterior') || lower.includes('voltar')) return { action: 'previous' };
    if (lower.includes('parar') || lower.includes('pause')) return { action: 'stop' };
    if (lower.includes('modo radio')) return { action: 'mode', target: 'radio' };
    if (lower.includes('modo tv')) return { action: 'mode', target: 'tv' };

    if (lower.includes('silencia')) return { action: 'mute' };
    if (lower.includes('ativar som') || lower.includes('dessilencia')) return { action: 'unmute' };
    if (lower.includes('volume')) {
      const match = text.match(/(\d+)/);
      return { action: 'volume', value: match ? match[1] : '50' };
    }
    if (lower.includes('aumentar')) return { action: 'volume', value: '+10' };
    if (lower.includes('diminui')) return { action: 'volume', value: '-10' };

    if (lower.includes('not') || lower.includes('news')) return { action: 'search', target: 'news' };
    if (lower.includes('esporte') || lower.includes('futebol')) return { action: 'search', target: 'sports' };
    if (lower.includes('musica') || lower.includes('música')) return { action: 'search', target: 'music' };
    if (lower.includes('film') || lower.includes('cinem')) return { action: 'search', target: 'movies' };
    if (lower.includes('infanti') || lower.includes('crianca') || lower.includes('criança')) return { action: 'search', target: 'kids' };

    return { action: 'search', target: lower };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionAvailable()) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, seu navegador não suporta reconhecimento de voz.',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'pt-BR';

    recognitionRef.current.onstart = () => setIsListening(true);

    recognitionRef.current.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      if (transcript.trim()) {
        const userMessage: AIMessage = {
          role: 'user',
          content: transcript,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        const command = processCommand(transcript);
        const responses: { [key: string]: string } = {
          next: '▶️ Avançando para o próximo canal...',
          previous: '⏮️ Voltando ao canal anterior...',
          stop: '⏹️ Reprodução parada.',
          mode: `🔄 Alternando para modo ${command.target}...`,
          mute: '🔇 Som desativado.',
          unmute: '🔊 Som ativado.',
          volume: `🔊 Volume ajustado para ${command.value}%`,
          search: `🔍 Procurando por "${command.target}"...`,
        };

        const assistantMessage: AIMessage = {
          role: 'assistant',
          content: responses[command.action] || 'Comando não reconhecido. Tente: "próximo canal", "aumentar volume", "buscar notícias"',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }

      setIsListening(false);
    };

    recognitionRef.current.onerror = (event: any) => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Erro no reconhecimento: ${event.error}. Tente novamente.`,
          timestamp: new Date(),
        },
      ]);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.start();
  }, [processCommand]);

  return {
    messages,
    isListening,
    startListening,
    processCommand,
  };
};