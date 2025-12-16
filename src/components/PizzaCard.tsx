import { useState } from 'react';
import { Plus, Flame, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pizza } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface PizzaCardProps {
  pizza: Pizza;
  onSelect: (pizza: Pizza) => void;
}

export function PizzaCard({ pizza, onSelect }: PizzaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isEmployee } = useAuth();

  const categoryColors = {
    tradicional: 'bg-primary/20 text-primary',
    especial: 'bg-secondary/20 text-secondary',
    doce: 'bg-pink-500/20 text-pink-400',
  };

  const categoryLabels = {
    tradicional: 'Tradicional',
    especial: 'Especial',
    doce: 'Doce',
  };

  return (
    <Card
      className={`group overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${isEmployee ? '' : 'cursor-pointer'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isEmployee && onSelect(pizza)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={pizza.image}
          alt={pizza.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className={`absolute top-3 left-3 ${categoryColors[pizza.category]}`}>
          {categoryLabels[pizza.category]}
        </Badge>

        {/* Flame for special */}
        {pizza.category === 'especial' && (
          <div className="absolute top-3 right-3">
            <Flame className="h-5 w-5 text-secondary animate-pulse" />
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">A partir de</p>
            <p className="text-2xl font-bold text-foreground">
              R$ {pizza.prices.pequena.toFixed(2).replace('.', ',')}
            </p>
          </div>
          {!isEmployee && (
            <Button
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-transform group-hover:scale-110"
            >
              <Plus className="h-5 w-5" />
            </Button>
          )}
          {isEmployee && (
            <div className="rounded-full bg-muted p-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
          {pizza.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{pizza.description}</p>
      </CardContent>
    </Card>
  );
}
