import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              'transition-all',
              isFilled ? 'fill-secondary text-secondary' : 'text-muted-foreground/30',
              interactive && 'cursor-pointer hover:scale-110'
            )}
            onClick={() => interactive && onRatingChange?.(index + 1)}
          />
        );
      })}
    </div>
  );
}
