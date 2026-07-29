export interface Product {
  id: string;
  name: string;
  price: number;
  category: "drinks" | "donuts" | "snacks";
  description: string;
  image: string;
  color: string;
  bgColor: string;
  rating: number;
  isPopular?: boolean;
  prepTime?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface NavItem {
  label: string;
  href: string;
}
