import { useState } from 'react';
import { Pizza, GlassWater, Cake } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PizzaCard } from '@/components/PizzaCard';
import { ProductCard } from '@/components/ProductCard';
import { PizzaBuilder } from '@/components/PizzaBuilder';
import { pizzas, bebidas, sobremesas } from '@/data/menuData';
import { Pizza as PizzaType } from '@/types';

const Cardapio = () => {
  const [selectedPizza, setSelectedPizza] = useState<PizzaType | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const pizzaCategories = [
    { id: 'all', label: 'Todas' },
    { id: 'tradicional', label: 'Tradicionais' },
    { id: 'especial', label: 'Especiais' },
    { id: 'doce', label: 'Doces' },
  ];

  const filteredPizzas = activeCategory === 'all'
    ? pizzas
    : pizzas.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Nosso Cardápio</h1>
          <p className="text-muted-foreground">
            Escolha entre nossas deliciosas pizzas, bebidas e sobremesas
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="pizzas" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="pizzas" className="flex items-center gap-2">
              <Pizza className="h-4 w-4" />
              Pizzas
            </TabsTrigger>
            <TabsTrigger value="bebidas" className="flex items-center gap-2">
              <GlassWater className="h-4 w-4" />
              Bebidas
            </TabsTrigger>
            <TabsTrigger value="sobremesas" className="flex items-center gap-2">
              <Cake className="h-4 w-4" />
              Sobremesas
            </TabsTrigger>
          </TabsList>

          {/* Pizzas */}
          <TabsContent value="pizzas" className="animate-fade-in">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {pizzaCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPizzas.map((pizza, index) => (
                <div
                  key={pizza.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PizzaCard pizza={pizza} onSelect={setSelectedPizza} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Bebidas */}
          <TabsContent value="bebidas" className="animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bebidas.map((bebida, index) => (
                <div
                  key={bebida.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={bebida} type="bebida" />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Sobremesas */}
          <TabsContent value="sobremesas" className="animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sobremesas.map((sobremesa, index) => (
                <div
                  key={sobremesa.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={sobremesa} type="sobremesa" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

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

export default Cardapio;
