import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Address } from '@/types';

const Perfil = () => {
  const navigate = useNavigate();
  const { user, profile, updateAddress } = useAuth();

  const [address, setAddress] = useState<Address>({
    street: profile?.street || '',
    number: profile?.number || '',
    complement: profile?.complement || '',
    neighborhood: profile?.neighborhood || '',
    city: profile?.city || 'Sorocaba',
    cep: profile?.cep || '',
  });

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updateAddress(address);
    toast.success('Endereço atualizado com sucesso!');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Meu Perfil</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas informações
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={profile?.name || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile?.email || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" value={profile?.phone || ''} disabled />
              </div>
              <p className="text-xs text-muted-foreground">
                Para alterar seus dados pessoais, entre em contato conosco.
              </p>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    value={address.cep}
                    onChange={(e) => handleAddressChange('cep', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    placeholder="Nome da rua"
                    value={address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    placeholder="123"
                    value={address.number}
                    onChange={(e) => handleAddressChange('number', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Nome do bairro"
                    value={address.neighborhood}
                    onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    placeholder="Apto, bloco, etc."
                    value={address.complement}
                    onChange={(e) => handleAddressChange('complement', e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Endereço
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
