export interface ShoppingCart {
  userId: string;
  items: ShoppingCartItem[];
}

export interface ShoppingCartItem {
  productId: string;
  quantity: number;
}
