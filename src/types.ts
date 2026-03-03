export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  material: string;
  gemstone: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}
