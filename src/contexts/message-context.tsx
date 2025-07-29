
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Message } from '@/types/message';
import { useAuth } from './auth-context';
import { subMonths } from 'date-fns';

interface MessageContextType {
  messages: Message[];
  getMessagesForUser: (email: string) => Message[];
  getUnreadCount: (email: string) => number;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (messageId: string) => void;
  deleteMessages: (messageIds: string[]) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MESSAGES_STORAGE_KEY = 'messages';

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  const syncMessages = useCallback(() => {
    try {
      const storedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages: Message[] = JSON.parse(storedMessages);
        
        // Auto-delete messages older than 3 months
        const threeMonthsAgo = subMonths(new Date(), 3);
        const recentMessages = parsedMessages.filter(
          (message) => new Date(message.timestamp) >= threeMonthsAgo
        );

        setMessages(recentMessages);
        
        // If messages were deleted, update localStorage
        if (recentMessages.length < parsedMessages.length) {
            localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(recentMessages));
        }

      } else {
        setMessages([]);
      }
    } catch (e) {
      console.error("Failed to parse messages from localStorage", e);
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    syncMessages();
  }, [syncMessages]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === MESSAGES_STORAGE_KEY) {
        syncMessages();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncMessages]);

  const getMessagesForUser = (email: string): Message[] => {
    return messages
      .filter(m => m.recipientEmail === email)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getUnreadCount = (email: string): number => {
    return messages.filter(m => m.recipientEmail === email && !m.read).length;
  };

  const sendMessage = (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: new Date().getTime().toString() + Math.random(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));
  };

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(m => (m.id === messageId ? { ...m, read: true } : m));
    setMessages(updatedMessages);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));
  };

  const deleteMessages = (messageIds: string[]) => {
    const updatedMessages = messages.filter(m => !messageIds.includes(m.id));
    setMessages(updatedMessages);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));
  };

  return (
    <MessageContext.Provider value={{ messages, getMessagesForUser, getUnreadCount, sendMessage, markAsRead, deleteMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
