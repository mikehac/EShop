import { useState } from "react";

export function ProductCounter({ onQuantityChange, value = 1 }: { onQuantityChange: (quantity: number) => void; value: number }) {
  const [quantity, setQuantity] = useState<number>(value);
  const incrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      onQuantityChange(newQuantity); // Notify parent of the new quantity
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : 1;
      onQuantityChange(newQuantity); // Notify parent of the new quantity
      return newQuantity;
    });
  };
  return (
    <div className="quantityCounter">
      <button onClick={decrementQuantity}>-</button>
      <span>{quantity}</span>
      <button onClick={incrementQuantity}>+</button>
    </div>
  );
}
