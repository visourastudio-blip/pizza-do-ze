import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { sizeLabels } from '@/data/menuData';

const MeusPedidos = () => {
  const navigate = useNavigate();
  const { getCustomerOrders, isLoading } = useOrders();
  const { isAuthenticated } = useAuth();

  const orders = getCustomerOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container max-w-2xl">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Nenhum pedido ainda</h1>
              <p className="text-muted-foreground">
                Que tal pedir uma pizza deliciosa?
              </p>
            </div>
            <Button onClick={() => navigate('/cardapio')} size="lg">
              Ver Cardápio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Meus Pedidos</h1>
            <p className="text-sm text-muted-foreground">
              {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => navigate(`/pedido/${order.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">Pedido #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.createdAt.toLocaleDateString('pt-BR')} às{' '}
                      {order.createdAt.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} size="sm" />
                </div>

                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  {order.items.slice(0, 3).map((item) => (
                    <p key={item.id}>
                      {item.quantity}x{' '}
                      {'pizza' in item && `${item.pizza.name} (${sizeLabels[item.size]})`}
                      {'bebida' in item && `${item.bebida.name} ${item.bebida.size}`}
                      {'sobremesa' in item && item.sobremesa.name}
                    </p>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs">+{order.items.length - 3} mais itens</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="font-semibold text-primary">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </span>
                  <Button variant="ghost" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeusPedidos;
