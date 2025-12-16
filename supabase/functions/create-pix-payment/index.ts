import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, cpf, amount, orderId } = await req.json();

    console.log('Creating PIX payment for:', { name, email, amount, orderId });

    const apiKey = Deno.env.get('ABACATEPAY_API_KEY');
    if (!apiKey) {
      throw new Error('ABACATEPAY_API_KEY not configured');
    }

    // Format CPF removing non-numeric characters
    const formattedCpf = cpf.replace(/\D/g, '');

    // Call Abacate Pay API to create PIX billing
    const response = await fetch('https://api.abacatepay.com/v1/billing/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        frequency: 'ONE_TIME',
        methods: ['PIX'],
        products: [
          {
            externalId: orderId || `pizza-order-${Date.now()}`,
            name: 'Pedido Pizzaria',
            quantity: 1,
            price: Math.round(amount * 100), // Convert to cents
          }
        ],
        customer: {
          name,
          email,
          cellphone: phone.replace(/\D/g, ''),
          taxId: formattedCpf,
        },
        returnUrl: `${req.headers.get('origin')}/meus-pedidos`,
        completionUrl: `${req.headers.get('origin')}/meus-pedidos`,
      }),
    });

    const data = await response.json();
    console.log('Abacate Pay response:', data);

    if (!response.ok) {
      console.error('Abacate Pay error:', data);
      throw new Error(data.message || 'Failed to create PIX payment');
    }

    return new Response(JSON.stringify({
      success: true,
      billingId: data.data?.id,
      qrCode: data.data?.pix?.qrCode,
      qrCodeImage: data.data?.pix?.qrCodeImage,
      copyPaste: data.data?.pix?.copyPaste,
      url: data.data?.url,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating PIX payment:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
