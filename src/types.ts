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
  flavors?: string[];
  color: string;
  bgColor: string;
  description: string;
  image: string;
}

export interface CartItem extends Omit<Juice, 'price' | 'variants' | 'flavors'> {
  cartItemId: string; // Unique ID for cart entry (id + variantName + flavor if any)
  price: number; // The computed full price
  variantName?: string;
  flavor?: string;
  quantity: number;
}
