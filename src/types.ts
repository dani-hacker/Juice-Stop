export interface JuiceVariant {
  name: string;
  price: number;
}

export interface Juice {
  id: string;
  name: string;
  category: string;
  price?: number;
  variants?: JuiceVariant[];
  color: string;
  bgColor: string;
  description: string;
  image: string;
}

export interface CartItem extends Omit<Juice, 'price' | 'variants'> {
  cartItemId: string; // Unique ID for cart entry (id + variantName if any)
  price: number; // The computed full price
  variantName?: string;
  quantity: number;
}
