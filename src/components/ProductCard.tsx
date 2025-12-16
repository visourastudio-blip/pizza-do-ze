import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bebida, Sobremesa } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Bebida | Sobremesa;
  type: 'bebida' | 'sobremesa';
}

export function ProductCard({ product, type }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addBebida, addSobremesa } = useCart();
  const { isEmployee } = useAuth();

  const handleAdd = () => {
    setIsAdding(true);
    
    if (type === 'bebida') {
      addBebida({
        id: '',
        bebida: product as Bebida,
        quantity,
      });
      toast.success(`${product.name} adicionado ao carrinho!`);
    } else {
      addSobremesa({
        id: '',
        sobremesa: product as Sobremesa,
        quantity,
      });
      toast.success(`${product.name} adicionado ao carrinho!`);
    }

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 300);
  };

  return (
    <Card className="group overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {'size' in product && (
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            {product.size}
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
          
          {!isEmployee && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {!isEmployee && (
          <Button
            className={`w-full transition-all ${isAdding ? 'scale-95' : ''}`}
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
