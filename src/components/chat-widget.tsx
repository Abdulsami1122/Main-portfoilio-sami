'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/app/context/ChatContext';
import { MessageCircle, X, Send } from 'lucide-react';

export function ChatWidget() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageText = input;
    setInput('');
    await sendMessage(messageText);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce-slow focus:outline-none cursor-pointer"
          aria-label="Open AI Assistant"
          title="Chat with Sami's AI Assistant"
        >
          <MessageCircle size={24} className="sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-black/30 backdrop-blur-xs"
          aria-label="Close chat"
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="Chat with AI" 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 max-w-lg h-[75vh] sm:h-[580px] max-h-[90vh] bg-background text-foreground rounded-2xl shadow-2xl flex flex-col border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-blue-700 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base !text-white flex items-center gap-2">
                <span>🤖 Chat with AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs !text-blue-100 truncate mt-0.5">Ask about Sami&apos;s projects, skills & experience</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-blue-800/80 rounded-lg transition-colors ml-2 flex-shrink-0 focus:outline-none cursor-pointer text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-muted/30">
            {/* Setup Instructions if API key not configured */}
            {error && error.includes('API key') && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1.5">⚙️ Gemini Setup Required</h4>
                <p className="text-blue-800 dark:text-blue-200">
                  Please configure <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> in your <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded font-mono">.env.local</code> file.
                </p>
              </div>
            )}

            {messages.length === 0 && !error && (
              <div className="flex items-center justify-center h-full text-muted-foreground text-center px-2">
                <div>
                  <MessageCircle size={32} className="mx-auto mb-2 opacity-40 text-primary" />
                  <p className="text-sm font-semibold !text-foreground">Start a conversation!</p>
                  <p className="text-xs mt-1 !text-muted-foreground">Ask anything about Sami&apos;s background, skills, or projects</p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-card border border-border text-foreground rounded-bl-xs'
                  }`}
                >
                  <p className={`break-words whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user' ? '!text-white font-medium' : '!text-foreground'
                  }`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-2xs">
                  <div className="flex space-x-1.5 items-center">
                    <span className="text-xs text-muted-foreground mr-1">Thinking</span>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {error && !error.includes('API key') && (
              <div className="flex justify-center px-2">
                <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-3.5 py-2.5 rounded-xl text-xs max-w-sm">
                  <p className="font-semibold flex items-center gap-1.5">
                    <span>❌ Error</span>
                  </p>
                  <p className="text-xs break-words mt-1 !text-red-600 dark:!text-red-400">{error}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 sm:p-3.5 border-t border-border flex-shrink-0 bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sami's experience, stack, projects..."
                maxLength={4000}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-muted/40 text-foreground placeholder-muted-foreground disabled:opacity-50 min-w-0"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 focus:outline-none cursor-pointer"
                title="Send Message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
