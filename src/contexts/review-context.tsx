
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Review } from '@/types/review';
import { reviews as demoReviews } from '@/lib/reviews-data';

interface ReviewContextType {
  reviews: Review[];
  loading: boolean;
  getReviewById: (id: string) => Review | null;
  addReview: (review: Review) => void;
  updateReview: (id: string, review: Review) => void;
  deleteReview: (id: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const REVIEWS_STORAGE_KEY = 'reviews';

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const syncReviews = useCallback(() => {
    try {
        const storedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(demoReviews));
            setReviews(demoReviews);
        }
    } catch (e) {
        console.error("Failed to parse reviews from localStorage", e);
        setReviews(demoReviews);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncReviews();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === REVIEWS_STORAGE_KEY) {
        syncReviews();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncReviews]);

  const getReviewById = (id: string): Review | null => {
    return reviews.find(r => r.id === id) || null;
  };

  const addReview = (review: Review) => {
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
  };

  const updateReview = (id: string, reviewData: Review) => {
    const updatedReviews = reviews.map(r => (r.id === id ? reviewData : r));
    setReviews(updatedReviews);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
  };

  const deleteReview = (id: string) => {
    const updatedReviews = reviews.filter(r => r.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
  };

  return (
    <ReviewContext.Provider value={{ reviews, loading, getReviewById, addReview, updateReview, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};
