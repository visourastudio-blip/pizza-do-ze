import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { Order, OrderStatus, CartItem, Customer } from '@/types';

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getCustomerOrders: () => Order[];
  getAllOrders: () => Order[];
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated || !user) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      const mappedOrders: Order[] = data.map((o) => ({
        id: o.id,
        items: o.items as unknown as CartItem[],
        customer: {
          id: o.user_id,
          name: '',
          email: '',
          phone: '',
        } as Customer,
        deliveryType: o.delivery_type as 'delivery' | 'retirada',
        paymentMethod: o.payment_method as 'pix' | 'credito' | 'debito' | 'dinheiro',
        change: o.change ? Number(o.change) : undefined,
        status: o.status as OrderStatus,
        total: Number(o.total),
        createdAt: new Date(o.created_at),
        estimatedDelivery: o.estimated_delivery ? new Date(o.estimated_delivery) : undefined,
      }));
      setOrders(mappedOrders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, user]);

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order | null> => {
    if (!user) return null;

    const now = new Date();
    const estimatedDelivery = orderData.deliveryType === 'delivery' 
      ? new Date(now.getTime() + 50 * 60000) 
      : null;

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        items: JSON.parse(JSON.stringify(orderData.items)),
        delivery_type: orderData.deliveryType,
        payment_method: orderData.paymentMethod,
        change: orderData.change ?? null,
        total: orderData.total,
        estimated_delivery: estimatedDelivery?.toISOString() ?? null,
      }])
      .select()
      .single();

    if (data && !error) {
      const newOrder: Order = {
        id: data.id,
        items: data.items as unknown as CartItem[],
        customer: orderData.customer,
        deliveryType: data.delivery_type as 'delivery' | 'retirada',
        paymentMethod: data.payment_method as 'pix' | 'credito' | 'debito' | 'dinheiro',
        change: data.change ? Number(data.change) : undefined,
        status: data.status as OrderStatus,
        total: Number(data.total),
        createdAt: new Date(data.created_at),
        estimatedDelivery: data.estimated_delivery ? new Date(data.estimated_delivery) : undefined,
      };
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    }

    return null;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    }
  };

  const getCustomerOrders = () => {
    if (!user) return [];
    return orders;
  };

  const getAllOrders = () => {
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        createOrder,
        updateOrderStatus,
        getCustomerOrders,
        getAllOrders,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
