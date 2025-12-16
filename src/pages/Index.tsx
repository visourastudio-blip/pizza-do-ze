import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin, Flame, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PizzaCard } from '@/components/PizzaCard';
import { PizzaBuilder } from '@/components/PizzaBuilder';
import { StarRating } from '@/components/StarRating';
import { useReviews } from '@/contexts/ReviewContext';
import { pizzas } from '@/data/menuData';
import { Pizza as PizzaType } from '@/types';
import { useState } from 'react';
import pizzariaLogo from '@/assets/pizzaria-logo.png';

const Index = () => {
  const navigate = useNavigate();
  const { reviews, getAverageRating } = useReviews();
  const [selectedPizza, setSelectedPizza] = useState<PizzaType | null>(null);

  const featuredPizzas = pizzas.filter(p => 
    ['1', '2', '5', '6'].includes(p.id)
  );

  const avgRating = getAverageRating();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left animate-slide-up">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                <Flame className="h-3 w-3 mr-1" />
                Forno a lenha tradicional
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Pizzaria</span>{' '}
                  <span className="gradient-text">do Zé</span>
                </h1>
                <p className="text-xl md:text-2xl text-secondary italic font-medium">
                  Pizza de verdade, feita com paixão.
                </p>
                <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Pizzas artesanais assadas no forno a lenha, com massa de fermentação lenta e ingredientes selecionados. Peça online e receba quentinha!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => navigate('/cardapio')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
                >
                  Ver Cardápio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/sobre')}
                  className="text-lg"
                >
                  Conheça nossa história
                </Button>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                  <span className="font-medium text-foreground">{avgRating.toFixed(1)}</span>
                  <span>({reviews.length} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>40-60 min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Sorocaba - SP</span>
                </div>
              </div>
            </div>

            {/* Right Content - Logo */}
            <div className="relative hidden lg:flex justify-center items-center animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl scale-110" />
                <img
                  src={pizzariaLogo}
                  alt="Pizzaria do Zé"
                  className="relative w-80 h-80 object-contain animate-float drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Pizza className="h-8 w-8 text-primary" />
                Mais Pedidas
              </h2>
              <p className="text-muted-foreground">Os sabores favoritos dos nossos clientes</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/cardapio')}>
              Ver cardápio completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPizzas.map((pizza, index) => (
              <div
                key={pizza.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PizzaCard pizza={pizza} onSelect={setSelectedPizza} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">O que dizem nossos clientes</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <StarRating rating={Math.round(avgRating)} size="lg" />
              <span className="text-2xl font-bold text-secondary">{avgRating.toFixed(1)}</span>
            </div>
            <p className="text-muted-foreground">{reviews.length} avaliações</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {reviews.slice(0, 3).map((review, index) => (
              <Card
                key={review.id}
                className="bg-card border-border/50 hover:border-primary/30 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{review.customerName}</h4>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/avaliacoes')}>
              Ver todas as avaliações
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para pedir?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Monte sua pizza do seu jeito, com os melhores ingredientes e entrega rápida!
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/cardapio')}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
          >
            Fazer meu pedido
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Pizza Builder Modal */}
      {selectedPizza && (
        <PizzaBuilder
          pizza={selectedPizza}
          isOpen={!!selectedPizza}
          onClose={() => setSelectedPizza(null)}
        />
      )}
    </div>
  );
};

export default Index;
