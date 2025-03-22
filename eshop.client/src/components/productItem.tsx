import { Link } from "react-router-dom";
import { Product } from "../types/product";

export function ProductItem({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product?.price);

  return (
    <section>
      <Link to={`/product/${product?.id}`}>
        <input type="hidden" value={product?.id} />
        <div className="productImage">
          <img src={product?.imageUrl} />
        </div>
        <div className="productName">{product?.name}</div>
        <div className="productPrice">{formattedPrice}</div>
      </Link>
    </section>
  );
}
