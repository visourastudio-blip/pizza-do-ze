import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CartPizza, CartBebida, CartSobremesa } from '@/types';
import { sizeLabels } from '@/data/menuData';

const Carrinho = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const total = getTotal();

  const getItemPrice = (item: CartPizza | CartBebida | CartSobremesa) => {
    if ('pizza' in item) {
      let price = item.pizza.prices[item.size];
      if (item.secondPizza) {
        const secondPrice = item.secondPizza.prices[item.size];
        price = Math.max(price, secondPrice);
      }
      if (item.borda) price += item.borda.price;
      item.adicionais.forEach(add => price += add.price);
      return price;
    } else if ('bebida' in item) {
      return item.bebida.price;
    } else {
      return item.sobremesa.price;
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container max-w-2xl">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground">
                Adicione algumas delícias do nosso cardápio!
              </p>
            </div>
            <Button onClick={() => navigate('/cardapio')} size="lg">
              Ver Cardápio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Carrinho</h1>
            <p className="text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden animate-fade-in">
                <CardContent className="p-4">
                  {'pizza' in item && (
                    <div className="flex gap-4">
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {item.pizza.name}
                              {item.secondPizza && ` + ${item.secondPizza.name}`}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {sizeLabels[item.size]}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {item.borda && (
                          <p className="text-xs text-muted-foreground">
                            Borda: {item.borda.name}
                          </p>
                        )}
                        {item.adicionais.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Adicionais: {item.adicionais.map(a => a.name).join(', ')}
                          </p>
                        )}
                        {item.observacoes && (
                          <p className="text-xs text-muted-foreground italic">
                            Obs: {item.observacoes}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold text-primary">
                            R$ {(getItemPrice(item) * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {'bebida' in item && (
                    <div className="flex gap-4">
                      <img
                        src={item.bebida.image}
                        alt={item.bebida.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.bebida.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.bebida.size}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold text-primary">
                            R$ {(item.bebida.price * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {'sobremesa' in item && (
                    <div className="flex gap-4">
                      <img
                        src={item.sobremesa.image}
                        alt={item.sobremesa.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.sobremesa.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.sobremesa.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold text-primary">
                            R$ {(item.sobremesa.price * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive w-full"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar carrinho
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Resumo do pedido</h3>
                
                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="text-success">A calcular</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>

                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Finalizar pedido
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Link to="/cardapio">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar mais itens
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
