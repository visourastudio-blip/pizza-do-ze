import { MapPin, Clock, Phone, Instagram, Globe, Flame, Pizza, Award, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import pizzariaLogo from '@/assets/pizzaria-logo.png';

const Sobre = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <img
            src={pizzariaLogo}
            alt="Pizzaria do Zé"
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-foreground">Pizzaria</span>{' '}
            <span className="gradient-text">do Zé</span>
          </h1>
          <p className="text-xl text-secondary italic mb-4">
            Pizza de verdade, feita com paixão.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fundada em 2018, a Pizzaria do Zé nasceu do sonho de levar pizzas artesanais de qualidade 
            para o bairro, mantendo o sabor tradicional italiano com um toque brasileiro. Cada pizza é 
            preparada com cuidado, respeito aos ingredientes e atenção a cada detalhe.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Flame, title: 'Forno a Lenha', desc: 'Sabor autêntico' },
            { icon: Pizza, title: 'Massa Artesanal', desc: 'Fermentação lenta' },
            { icon: Utensils, title: 'Ingredientes', desc: 'Selecionados' },
            { icon: Award, title: 'Desde 2018', desc: 'Tradição e qualidade' },
          ].map((feature, index) => (
            <Card key={index} className="text-center hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <feature.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Location */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Localização
              </h3>
              <address className="not-italic text-muted-foreground space-y-1">
                <p>Rua das Oliveiras, 452</p>
                <p>Bairro Jardim Itália</p>
                <p>Sorocaba – SP</p>
                <p>CEP: 18075-210</p>
              </address>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horário de Funcionamento
              </h3>
              <div className="text-muted-foreground">
                <p className="mb-2">Terça a Domingo</p>
                <p className="text-2xl font-bold text-secondary">18:00 às 23:30</p>
                <p className="text-destructive text-sm mt-2">
                  (Fechado às segundas-feiras)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Delivery */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Contact */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contato
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+5515998743321"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  (15) 99874-3321
                </a>
                <a
                  href="https://instagram.com/pizzariadoze.oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  @pizzariadoze.oficial
                </a>
                <a
                  href="https://www.pizzariadoze.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  www.pizzariadoze.com.br
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Delivery */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">🚚 Entrega</h3>
              <div className="text-muted-foreground space-y-2">
                <p>Delivery próprio</p>
                <p className="text-lg font-medium text-foreground">
                  Tempo médio: 40 a 60 minutos
                </p>
                <p>Retirada no balcão disponível</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">🧾 Formas de Pagamento</h3>
            <div className="flex flex-wrap gap-3">
              {['Pix', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'].map((method) => (
                <span
                  key={method}
                  className="px-4 py-2 bg-muted rounded-lg text-sm font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Flavors */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">🍕 Sabores Mais Pedidos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                'Calabresa Especial',
                'Marguerita Tradicional',
                'Portuguesa Completa',
                'Frango com Catupiry',
                'Quatro Queijos',
              ].map((flavor, index) => (
                <div
                  key={flavor}
                  className="flex items-center gap-2 p-3 bg-muted rounded-lg"
                >
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-sm">{flavor}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            ⚠️ <strong>Atenção:</strong> Este é um projeto fictício para fins de demonstração.
            Todos os dados apresentados (endereço, telefone, informações) são fictícios e não representam
            um estabelecimento real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
