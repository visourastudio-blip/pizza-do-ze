import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, QrCode, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PixPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: () => void;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
}

interface PixData {
  qrCode?: string;
  qrCodeImage?: string;
  copyPaste?: string;
  url?: string;
}

const PixPaymentModal = ({
  open,
  onOpenChange,
  amount,
  onSuccess,
  defaultName = '',
  defaultEmail = '',
  defaultPhone = '',
}: PixPaymentModalProps) => {
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(defaultPhone);
  const [email, setEmail] = useState(defaultEmail);
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const isFormValid = () => {
    const cpfDigits = cpf.replace(/\D/g, '');
    const phoneDigits = phone.replace(/\D/g, '');
    return (
      name.trim().length >= 3 &&
      phoneDigits.length >= 10 &&
      email.includes('@') &&
      cpfDigits.length === 11
    );
  };

  const handleGenerateQrCode = async () => {
    if (!isFormValid()) {
      toast.error('Preencha todos os campos corretamente');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: {
          name,
          phone,
          email,
          cpf,
          amount,
        },
      });

      if (error) throw error;

      if (data?.success) {
        setPixData({
          qrCode: data.qrCode,
          qrCodeImage: data.qrCodeImage,
          copyPaste: data.copyPaste,
          url: data.url,
        });
        toast.success('QR Code gerado com sucesso!');
      } else {
        throw new Error(data?.error || 'Erro ao gerar QR Code');
      }
    } catch (error: any) {
      console.error('Error generating PIX:', error);
      toast.error(error.message || 'Erro ao gerar QR Code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPix = async () => {
    if (pixData?.copyPaste) {
      await navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      toast.success('Código PIX copiado!');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleConfirmPayment = () => {
    onSuccess();
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setPixData(null);
    setCpf('');
    setCopied(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Pagamento via PIX
          </DialogTitle>
        </DialogHeader>

        {!pixData ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para gerar o QR Code de pagamento.
            </p>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="pix-name">Nome completo</Label>
                <Input
                  id="pix-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pix-phone">Telefone</Label>
                <Input
                  id="pix-phone"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pix-email">E-mail</Label>
                <Input
                  id="pix-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pix-cpf">CPF</Label>
                <Input
                  id="pix-cpf"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium mb-3">
                Total: <span className="text-primary">R$ {amount.toFixed(2).replace('.', ',')}</span>
              </p>
              <Button
                onClick={handleGenerateQrCode}
                disabled={!isFormValid() || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando QR Code...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" />
                    Gerar QR Code
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              {pixData.qrCodeImage ? (
                <img
                  src={pixData.qrCodeImage}
                  alt="QR Code PIX"
                  className="w-48 h-48 rounded-lg border"
                />
              ) : (
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Escaneie o QR Code ou copie o código para pagar
              </p>

              {pixData.copyPaste && (
                <Button
                  variant="outline"
                  onClick={handleCopyPix}
                  className="w-full"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar código PIX
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <Button onClick={handleConfirmPayment} className="w-full">
                Já realizei o pagamento
              </Button>
              <Button
                variant="ghost"
                onClick={() => setPixData(null)}
                className="w-full"
              >
                Voltar e editar dados
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PixPaymentModal;
