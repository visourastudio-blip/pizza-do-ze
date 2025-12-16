import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { Review } from '@/types';

interface ReviewContextType {
  reviews: Review[];
  isLoading: boolean;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<boolean>;
  getAverageRating: () => number;
  refreshReviews: () => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      const mappedReviews: Review[] = data.map((r) => ({
        id: r.id,
        customerName: r.customer_name,
        rating: r.rating,
        comment: r.comment,
        createdAt: new Date(r.created_at),
      }));
      setReviews(mappedReviews);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<boolean> => {
    if (!user) return false;

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        customer_name: reviewData.customerName,
        rating: reviewData.rating,
        comment: reviewData.comment,
      })
      .select()
      .single();

    if (data && !error) {
      const newReview: Review = {
        id: data.id,
        customerName: data.customer_name,
        rating: data.rating,
        comment: data.comment,
        createdAt: new Date(data.created_at),
      };
      setReviews(prev => [newReview, ...prev]);
      return true;
    }

    return false;
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  };

  const refreshReviews = async () => {
    await fetchReviews();
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        isLoading,
        addReview,
        getAverageRating,
        refreshReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}
