'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/app/context/ChatContext';
import { Send, X, MessageCircle } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="no-overlay fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-pulse focus:outline-none"
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 max-w-lg h-[70vh] sm:h-[600px] max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl sm:rounded-lg shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl sm:rounded-t-lg flex-shrink-0">
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base">Chat with AI</h3>
              <p className="text-xs opacity-90 truncate">Ask about Sami&apos;s work</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="no-overlay p-1 hover:bg-blue-800 rounded transition-colors ml-2 flex-shrink-0 focus:outline-none"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
            {/* Setup Instructions if API key not configured */}
            {error && error.includes('API key') && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 text-sm">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">⚙️ Setup Required</h4>
                <ol className="space-y-2 text-blue-800 dark:text-blue-200 list-decimal list-inside text-xs sm:text-sm">
                  <li>Get a free API key from <a href="https://console.groq.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-600 dark:hover:text-blue-300">console.groq.com</a></li>
                  <li>Open <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">.env.local</code> in your project root</li>
                  <li>Replace <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">your_groq_api_key_here</code> with your actual key</li>
                  <li>Restart your dev server</li>
                </ol>
              </div>
            )}

            {messages.length === 0 && !error && (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center px-2">
                <div>
                  <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">Start a conversation!</p>
                  <p className="text-xs mt-1 opacity-75">Ask about projects, skills, or experience</p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {error && !error.includes('API key') && (
              <div className="flex justify-center px-2">
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm max-w-sm">
                  <p className="font-semibold">❌ Error</p>
                  <p className="text-xs break-words mt-1">{error}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 min-w-0"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="no-overlay px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 focus:outline-none active:shadow-none"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
