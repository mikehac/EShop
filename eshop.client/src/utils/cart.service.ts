import { AppContextType } from "../AppContext";
import { ShoppingCart } from "../types/shopingCart";
import { httpPost } from "./service";

export async function addItemsToCard(cartItems: ShoppingCart, context: AppContextType) {
  return httpPost("cart", cartItems).then((res) => {
    context.setTotalItems(res.totalItems);
    console.log(res.totalItems);
  });
}
