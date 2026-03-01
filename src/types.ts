export interface Juice {
  id: string;
  name: string;
  price: number;
  color: string;
  bgColor: string;
  description: string;
  image: string;
}

export interface CartItem extends Juice {
  quantity: number;
}
