export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}
