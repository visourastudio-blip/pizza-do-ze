import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, ChefHat, Truck, Package, MapPin, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useOrders } from '@/contexts/OrderContext';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { OrderStatus } from '@/types';
import { toast } from 'sonner';

const statusSteps: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'recebido', label: 'Pedido Recebido', icon: Clock },
  { status: 'em_preparo', label: 'Em Preparo', icon: ChefHat },
  { status: 'saiu_entrega', label: 'Saiu para Entrega', icon: Truck },
  { status: 'entregue', label: 'Entregue', icon: CheckCircle },
];

const statusStepsRetirada: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'recebido', label: 'Pedido Recebido', icon: Clock },
  { status: 'em_preparo', label: 'Em Preparo', icon: ChefHat },
  { status: 'pronto_retirada', label: 'Pronto para Retirada', icon: Package },
];

const PedidoStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, refreshOrders } = useOrders();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrders();
    setIsRefreshing(false);
    toast.success('Status atualizado!');
  };

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Pedido não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const steps = order.deliveryType === 'delivery' ? statusSteps : statusStepsRetirada;
  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  const progress = order.status === 'entregue' || order.status === 'pronto_retirada'
    ? 100
    : ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/meus-pedidos')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
            <p className="text-sm text-muted-foreground">
              {order.createdAt.toLocaleDateString('pt-BR')} às{' '}
              {order.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <OrderStatusBadge status={order.status} size="lg" />
                {order.estimatedDelivery && order.status !== 'entregue' && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Previsão</p>
                    <p className="font-medium">
                      {order.estimatedDelivery.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}
              </div>

              <Progress value={progress} className="h-2" />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 w-full"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Atualizando...' : 'Atualizar Status'}
              </Button>
            </div>

            <CardContent className="p-6">
              {/* Timeline */}
              <div className="relative">
                {steps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.status} className="flex gap-4 pb-6 last:pb-0">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          } ${isCurrent ? 'ring-4 ring-primary/30 animate-pulse' : ''}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-0.5 flex-1 mt-2 ${
                              index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <p
                          className={`font-medium ${
                            isCompleted ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          {order.deliveryType === 'delivery' && order.customer.address && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Endereço de Entrega
                </h3>
                <p className="text-muted-foreground">
                  {order.customer.address.street}, {order.customer.address.number}
                  {order.customer.address.complement && ` - ${order.customer.address.complement}`}
                </p>
                <p className="text-muted-foreground">
                  {order.customer.address.neighborhood} - {order.customer.address.city}
                </p>
                <p className="text-muted-foreground">CEP: {order.customer.address.cep}</p>
              </CardContent>
            </Card>
          )}

          {/* Order Items */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Itens do Pedido</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x{' '}
                      {'pizza' in item && item.pizza.name}
                      {'bebida' in item && `${item.bebida.name} (${item.bebida.size})`}
                      {'sobremesa' in item && item.sobremesa.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Precisa de ajuda?
              </h3>
              <Button variant="outline" className="w-full" asChild>
                <a href="tel:+5515998743321">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar para a pizzaria
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PedidoStatus;
