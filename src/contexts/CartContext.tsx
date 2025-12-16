import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartPizza, CartBebida, CartSobremesa } from '@/types';

interface CartContextType {
  items: CartItem[];
  addPizza: (pizza: CartPizza) => void;
  addBebida: (bebida: CartBebida) => void;
  addSobremesa: (sobremesa: CartSobremesa) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addPizza = (pizza: CartPizza) => {
    setItems(prev => [...prev, { ...pizza, id: crypto.randomUUID() }]);
  };

  const addBebida = (bebida: CartBebida) => {
    const existing = items.find(
      item => 'bebida' in item && item.bebida.id === bebida.bebida.id
    );
    if (existing) {
      updateQuantity(existing.id, (existing as CartBebida).quantity + bebida.quantity);
    } else {
      setItems(prev => [...prev, { ...bebida, id: crypto.randomUUID() }]);
    }
  };

  const addSobremesa = (sobremesa: CartSobremesa) => {
    const existing = items.find(
      item => 'sobremesa' in item && item.sobremesa.id === sobremesa.sobremesa.id
    );
    if (existing) {
      updateQuantity(existing.id, (existing as CartSobremesa).quantity + sobremesa.quantity);
    } else {
      setItems(prev => [...prev, { ...sobremesa, id: crypto.randomUUID() }]);
    }
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      if ('pizza' in item) {
        const pizzaItem = item as CartPizza;
        let itemTotal = pizzaItem.pizza.prices[pizzaItem.size];
        if (pizzaItem.secondPizza) {
          const secondPrice = pizzaItem.secondPizza.prices[pizzaItem.size];
          itemTotal = Math.max(itemTotal, secondPrice);
        }
        if (pizzaItem.borda) {
          itemTotal += pizzaItem.borda.price;
        }
        pizzaItem.adicionais.forEach(add => {
          itemTotal += add.price;
        });
        return total + (itemTotal * pizzaItem.quantity);
      } else if ('bebida' in item) {
        const bebidaItem = item as CartBebida;
        return total + (bebidaItem.bebida.price * bebidaItem.quantity);
      } else if ('sobremesa' in item) {
        const sobremesaItem = item as CartSobremesa;
        return total + (sobremesaItem.sobremesa.price * sobremesaItem.quantity);
      }
      return total;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addPizza,
        addBebida,
        addSobremesa,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
