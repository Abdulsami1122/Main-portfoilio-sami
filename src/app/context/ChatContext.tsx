'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  isConfigured: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    // Add initial welcome message
    const welcomeMessage: Message = {
      id: '0',
      role: 'assistant',
      content: 'Hi! I\'m an AI assistant on Sami\'s portfolio. Ask me anything about his projects, skills, or experience!',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const requestMessages = nextMessages.map(({ role, content }) => ({ role, content }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: requestMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || 'Failed to get response';
        setError(errorMsg);
        
        if (errorMsg.includes('API key') || errorMsg.includes('not configured')) {
          setIsConfigured(false);
        }
        
        return;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, sendMessage, clearMessages, isConfigured }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
