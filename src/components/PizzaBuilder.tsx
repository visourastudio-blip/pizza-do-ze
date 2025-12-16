import { useState } from 'react';
import { X, Plus, Minus, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pizza, PizzaSize, Borda, Adicional } from '@/types';
import { pizzas, bordas, adicionais, sizeLabels } from '@/data/menuData';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface PizzaBuilderProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
}

export function PizzaBuilder({ pizza, isOpen, onClose }: PizzaBuilderProps) {
  const [size, setSize] = useState<PizzaSize>('media');
  const [isHalfAndHalf, setIsHalfAndHalf] = useState(false);
  const [secondPizza, setSecondPizza] = useState<Pizza | null>(null);
  const [selectedBorda, setSelectedBorda] = useState<Borda>(bordas[0]);
  const [selectedAdicionais, setSelectedAdicionais] = useState<Adicional[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addPizza } = useCart();

  const calculateTotal = () => {
    let total = pizza.prices[size];
    
    if (isHalfAndHalf && secondPizza) {
      const secondPrice = secondPizza.prices[size];
      total = Math.max(total, secondPrice);
    }
    
    total += selectedBorda.price;
    selectedAdicionais.forEach(add => {
      total += add.price;
    });
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    addPizza({
      id: '',
      pizza,
      secondPizza: isHalfAndHalf ? secondPizza || undefined : undefined,
      size,
      borda: selectedBorda.price > 0 ? selectedBorda : undefined,
      adicionais: selectedAdicionais,
      observacoes,
      quantity,
    });

    toast.success('Pizza adicionada ao carrinho!', {
      description: `${pizza.name}${secondPizza ? ` + ${secondPizza.name}` : ''} (${sizeLabels[size]})`,
    });

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSize('media');
    setIsHalfAndHalf(false);
    setSecondPizza(null);
    setSelectedBorda(bordas[0]);
    setSelectedAdicionais([]);
    setObservacoes('');
    setQuantity(1);
  };

  const toggleAdicional = (adicional: Adicional) => {
    setSelectedAdicionais(prev =>
      prev.find(a => a.id === adicional.id)
        ? prev.filter(a => a.id !== adicional.id)
        : [...prev, adicional]
    );
  };

  const otherPizzas = pizzas.filter(p => p.id !== pizza.id && p.category === pizza.category);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-4">
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <DialogTitle className="text-xl">Monte sua {pizza.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{pizza.description}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <div className="space-y-6 py-4">
            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-primary" />
                Escolha o tamanho
              </Label>
              <RadioGroup
                value={size}
                onValueChange={(v) => setSize(v as PizzaSize)}
                className="grid grid-cols-2 gap-3"
              >
                {Object.entries(sizeLabels).map(([key, label]) => (
                  <Card
                    key={key}
                    className={`p-3 cursor-pointer transition-all ${
                      size === key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSize(key as PizzaSize)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={key} id={key} />
                      <div className="flex-1">
                        <Label htmlFor={key} className="cursor-pointer font-medium">
                          {label}
                        </Label>
                        <p className="text-sm text-primary font-semibold">
                          R$ {pizza.prices[key as PizzaSize].toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </RadioGroup>
            </div>

            {/* Half and Half */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="halfAndHalf"
                  checked={isHalfAndHalf}
                  onCheckedChange={(checked) => {
                    setIsHalfAndHalf(!!checked);
                    if (!checked) setSecondPizza(null);
                  }}
                />
                <Label htmlFor="halfAndHalf" className="cursor-pointer">
                  Quero meio a meio
                </Label>
              </div>

              {isHalfAndHalf && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  {otherPizzas.map((p) => (
                    <Card
                      key={p.id}
                      className={`p-2 cursor-pointer transition-all ${
                        secondPizza?.id === p.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSecondPizza(p)}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full aspect-video object-cover rounded mb-2"
                      />
                      <p className="text-xs font-medium text-center line-clamp-1">{p.name}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Borda */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Escolha a borda</Label>
              <RadioGroup
                value={selectedBorda.id}
                onValueChange={(v) => setSelectedBorda(bordas.find(b => b.id === v) || bordas[0])}
                className="space-y-2"
              >
                {bordas.map((borda) => (
                  <div
                    key={borda.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedBorda.id === borda.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedBorda(borda)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={borda.id} id={borda.id} />
                      <Label htmlFor={borda.id} className="cursor-pointer">
                        {borda.name}
                      </Label>
                    </div>
                    {borda.price > 0 && (
                      <span className="text-sm text-secondary font-medium">
                        + R$ {borda.price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Adicionais */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Adicionais</Label>
              <div className="grid grid-cols-2 gap-2">
                {adicionais.map((adicional) => (
                  <div
                    key={adicional.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAdicionais.find(a => a.id === adicional.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAdicional(adicional)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={!!selectedAdicionais.find(a => a.id === adicional.id)}
                        onCheckedChange={() => toggleAdicional(adicional)}
                      />
                      <span className="text-sm">{adicional.name}</span>
                    </div>
                    <span className="text-xs text-secondary font-medium">
                      + R$ {adicional.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Observações</Label>
              <Textarea
                placeholder="Ex: Sem cebola, bem assada, etc."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </ScrollArea>

        {/* Footer - Fixed at bottom */}
        <div className="sticky bottom-0 border-t border-border p-4 space-y-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-primary">
                R$ {calculateTotal().toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>

          <Button onClick={handleAddToCart} className="w-full gap-2" size="lg">
            <Plus className="h-5 w-5" />
            Adicionar ao carrinho
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
