
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';

export interface ChatMessage {
  id: string;
  conversationId: string; // User's email
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
  read: boolean;
}

interface ChatContextType {
  conversations: Record<string, ChatMessage[]>;
  getConversation: (conversationId: string) => ChatMessage[];
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (conversationId: string) => void;
  getUnreadAdminMessageCount: (conversationId: string) => number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = 'chatConversations';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({});
  const { user } = useAuth();

  const syncChat = useCallback(() => {
    try {
      const storedChat = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedChat) {
        setConversations(JSON.parse(storedChat));
      } else {
        setConversations({});
      }
    } catch (e) {
      console.error("Failed to parse chat from localStorage", e);
      setConversations({});
    }
  }, []);

  useEffect(() => {
    syncChat();
  }, [syncChat]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CHAT_STORAGE_KEY) {
        syncChat();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncChat]);

  const getConversation = (conversationId: string): ChatMessage[] => {
    return conversations[conversationId] || [];
  };

  const getUnreadAdminMessageCount = (conversationId: string): number => {
    const conversation = conversations[conversationId] || [];
    return conversation.filter(m => m.sender === 'admin' && !m.read).length;
  }

  const sendMessage = (message: Omit<ChatMessage, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `${new Date().getTime()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      read: message.sender === 'user' ? true : false,
    };

    setConversations(prev => {
      const updatedConversations = { ...prev };
      const currentConversation = updatedConversations[message.conversationId] || [];
      updatedConversations[message.conversationId] = [...currentConversation, newMessage];
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedConversations));
      return updatedConversations;
    });
  };

  const markAsRead = (conversationId: string) => {
     setConversations(prev => {
        const updatedConversations = { ...prev };
        const conversation = updatedConversations[conversationId];
        if (conversation) {
            updatedConversations[conversationId] = conversation.map(msg => ({ ...msg, read: true }));
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedConversations));
        }
        return updatedConversations;
    });
  }

  return (
    <ChatContext.Provider value={{ conversations, getConversation, sendMessage, markAsRead, getUnreadAdminMessageCount }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
