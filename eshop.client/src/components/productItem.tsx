import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { currencyFormat } from "../utils/formatter";

export function ProductItem({ product }: { product: Product }) {
  return (
    <section>
      <Link to={`/products/${product?.id}`}>
        <input type="hidden" value={product?.id} />
        <div className="productImage">
          <img src={product?.imageUrl} />
        </div>
        <div className="productName">{product?.name}</div>
        <div className="productPrice">{currencyFormat(product?.price)}</div>
      </Link>
    </section>
  );
}
