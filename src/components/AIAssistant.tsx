import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageCircle, X } from 'lucide-react';
import { useAIAssistant } from '../hooks/useAIAssistant';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isListening, startListening } = useAIAssistant();

  useEffect(() => {
    if (scrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, scrollToBottom]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-br from-green-600 to-green-500 text-white rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-40 w-96 h-96 bg-black border-2 border-green-500 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.5)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-black px-4 py-3 font-bold text-sm uppercase">
            🤖 ASSISTENTE DE IA - RIO TV ABERTA
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm font-semibold ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-black'
                      : 'bg-gray-800 text-green-400 border border-green-500/50'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input */}
          <div className="border-t border-green-500/50 p-3">
            <button
              onClick={startListening}
              disabled={isListening}
              className={`w-full py-2 px-3 rounded-lg font-bold text-sm uppercase flex items-center justify-center gap-2 transition-all ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-green-600 text-black hover:bg-green-500'
              }`}
            >
              <Mic size={16} /> {isListening ? 'Ouvindo...' : 'Fale um comando'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};