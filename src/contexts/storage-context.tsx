
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { StorageFile } from '@/types/storage-file';
import { initialFiles } from '@/lib/storage-data';

interface StorageContextType {
  files: StorageFile[];
  loading: boolean;
  uploadFile: (fileData: Omit<StorageFile, 'id' | 'createdAt'>) => void;
  deleteFiles: (ids: string[]) => void;
  renameFile: (id: string, newName: string) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

const STORAGE_KEY = 'fileStorage';

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);

  const syncFiles = useCallback(() => {
    try {
      const storedFiles = localStorage.getItem(STORAGE_KEY);
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialFiles));
        setFiles(initialFiles);
      }
    } catch (e) {
      console.error("Failed to parse files from localStorage", e);
      setFiles(initialFiles);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncFiles();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        syncFiles();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncFiles]);

  const uploadFile = (fileData: Omit<StorageFile, 'id' | 'createdAt'>) => {
    const newFile: StorageFile = {
      ...fileData,
      id: `${new Date().getTime()}-${fileData.name}`,
      createdAt: new Date().toISOString(),
    };
    const updatedFiles = [newFile, ...files];
    setFiles(updatedFiles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
  };

  const deleteFiles = (ids: string[]) => {
    const updatedFiles = files.filter(file => !ids.includes(file.id));
    setFiles(updatedFiles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
  };

  const renameFile = (id: string, newName: string) => {
    const updatedFiles = files.map(file =>
      file.id === id ? { ...file, name: newName } : file
    );
    setFiles(updatedFiles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
  };

  return (
    <StorageContext.Provider value={{ files, loading, uploadFile, deleteFiles, renameFile }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
