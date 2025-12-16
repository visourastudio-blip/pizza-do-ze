import { MapPin, Phone, Clock, Instagram, Globe } from 'lucide-react';
import pizzariaLogo from '@/assets/pizzaria-logo.png';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={pizzariaLogo} alt="Pizzaria do Zé" className="h-14 w-14 rounded-lg" />
              <div>
                <h3 className="text-xl font-bold">
                  <span className="text-foreground">Pizzaria</span>{' '}
                  <span className="text-primary">do Zé</span>
                </h3>
                <p className="text-sm text-secondary italic">Pizza de verdade, feita com paixão.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fundada em 2018, levamos pizzas artesanais de qualidade, mantendo o sabor tradicional italiano com um toque brasileiro.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Localização
            </h4>
            <address className="text-sm text-muted-foreground not-italic space-y-1">
              <p>Rua das Oliveiras, 452</p>
              <p>Bairro Jardim Itália</p>
              <p>Sorocaba – SP</p>
              <p>CEP: 18075-210</p>
            </address>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Horário de Funcionamento
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Terça a Domingo</p>
              <p className="text-secondary font-medium">18:00 às 23:30</p>
              <p className="text-destructive text-xs">(Fechado às segundas-feiras)</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+5515998743321"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                (15) 99874-3321
              </a>
              <a
                href="https://instagram.com/pizzariadoze.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @pizzariadoze.oficial
              </a>
              <a
                href="https://www.pizzariadoze.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
                www.pizzariadoze.com.br
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Formas de pagamento:</span>
              <span className="text-foreground">Pix</span>
              <span className="text-foreground">Crédito</span>
              <span className="text-foreground">Débito</span>
              <span className="text-foreground">Dinheiro</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ Este é um projeto fictício para demonstração. Os dados apresentados não são reais.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
