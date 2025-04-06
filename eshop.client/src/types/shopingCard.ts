export interface ShoppingCard {
  userId: string;
  items: ShoppingCardItem[];
}
export interface ShoppingCardItem {
  productId: string;
  quantity: number;
}
