import { Pizza, Bebida, Sobremesa, Borda, Adicional } from '@/types';

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Calabresa Especial',
    description: 'Calabresa fatiada, cebola, azeitonas pretas, orégano e molho especial da casa',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    prices: { pequena: 35, media: 45, grande: 55, gigante: 70 },
    category: 'tradicional',
  },
  {
    id: '2',
    name: 'Marguerita Tradicional',
    description: 'Molho de tomate, mussarela de búfala, tomate fresco, manjericão e azeite extra virgem',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    prices: { pequena: 38, media: 48, grande: 60, gigante: 75 },
    category: 'tradicional',
  },
  {
    id: '3',
    name: 'Portuguesa Completa',
    description: 'Presunto, ovos, cebola, ervilha, palmito, mussarela e azeitonas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    prices: { pequena: 40, media: 52, grande: 65, gigante: 80 },
    category: 'tradicional',
  },
  {
    id: '4',
    name: 'Frango com Catupiry',
    description: 'Frango desfiado temperado, catupiry cremoso, milho e orégano',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
    prices: { pequena: 42, media: 54, grande: 68, gigante: 85 },
    category: 'tradicional',
  },
  {
    id: '5',
    name: 'Quatro Queijos',
    description: 'Mussarela, provolone, parmesão e gorgonzola com orégano',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop',
    prices: { pequena: 45, media: 58, grande: 72, gigante: 90 },
    category: 'especial',
  },
  {
    id: '6',
    name: 'Pepperoni Premium',
    description: 'Pepperoni importado, mussarela especial, pimentões e molho picante',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    prices: { pequena: 48, media: 62, grande: 78, gigante: 95 },
    category: 'especial',
  },
  {
    id: '7',
    name: 'Carne Seca com Cream Cheese',
    description: 'Carne seca desfiada, cream cheese, cebola caramelizada e rúcula',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop',
    prices: { pequena: 52, media: 68, grande: 85, gigante: 105 },
    category: 'especial',
  },
  {
    id: '8',
    name: 'Chocolate com Morango',
    description: 'Chocolate ao leite derretido, morangos frescos e chantilly',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop',
    prices: { pequena: 35, media: 45, grande: 55, gigante: 70 },
    category: 'doce',
  },
  {
    id: '9',
    name: 'Banana com Canela',
    description: 'Banana caramelizada, canela, açúcar e leite condensado',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    prices: { pequena: 32, media: 42, grande: 52, gigante: 65 },
    category: 'doce',
  },
  {
    id: '10',
    name: 'Romeu e Julieta',
    description: 'Queijo mussarela derretido com goiabada cascão cremosa',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    prices: { pequena: 34, media: 44, grande: 54, gigante: 68 },
    category: 'doce',
  },
];

export const bebidas: Bebida[] = [
  {
    id: 'b1',
    name: 'Coca-Cola',
    description: 'Refrigerante Coca-Cola gelado',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop',
    price: 8,
    size: '350ml',
  },
  {
    id: 'b4',
    name: 'Guaraná Antarctica',
    description: 'Refrigerante Guaraná gelado',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop',
    price: 7,
    size: '350ml',
  },
  {
    id: 'b6',
    name: 'Suco Natural de Laranja',
    description: 'Suco de laranja natural, feito na hora',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
    price: 10,
    size: '300ml',
  },
  {
    id: 'b7',
    name: 'Água Mineral',
    description: 'Água mineral sem gás',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
    price: 4,
    size: '500ml',
  },
  {
    id: 'b8',
    name: 'Água com Gás',
    description: 'Água mineral com gás',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
    price: 5,
    size: '500ml',
  },
];

export const sobremesas: Sobremesa[] = [
  {
    id: 's1',
    name: 'Petit Gâteau',
    description: 'Bolinho de chocolate com recheio cremoso, acompanha sorvete de creme',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    price: 22,
  },
  {
    id: 's2',
    name: 'Brownie com Sorvete',
    description: 'Brownie de chocolate intenso com sorvete de baunilha e calda',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    price: 18,
  },
  {
    id: 's3',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Cheesecake cremoso com calda de frutas vermelhas',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
    price: 20,
  },
  {
    id: 's4',
    name: 'Tiramisù',
    description: 'Sobremesa italiana com café, mascarpone e cacau',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    price: 24,
  },
];

export const bordas: Borda[] = [
  { id: 'borda1', name: 'Sem borda recheada', price: 0 },
  { id: 'borda2', name: 'Catupiry', price: 8 },
  { id: 'borda3', name: 'Cheddar', price: 8 },
  { id: 'borda4', name: 'Cream Cheese', price: 10 },
  { id: 'borda5', name: 'Chocolate', price: 10 },
];

export const adicionais: Adicional[] = [
  { id: 'add1', name: 'Bacon extra', price: 6 },
  { id: 'add2', name: 'Queijo extra', price: 5 },
  { id: 'add3', name: 'Calabresa extra', price: 6 },
  { id: 'add4', name: 'Catupiry extra', price: 7 },
  { id: 'add5', name: 'Azeitonas extra', price: 4 },
  { id: 'add6', name: 'Cebola extra', price: 3 },
];

export const sizeLabels: Record<string, string> = {
  pequena: 'Pequena (4 fatias)',
  media: 'Média (6 fatias)',
  grande: 'Grande (8 fatias)',
  gigante: 'Gigante (12 fatias)',
};
