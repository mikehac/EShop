import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import { currencyFormat } from "../utils/formatter";

export function ProductItem({ product }: { product: Product }) {
  const navigate = useNavigate();
  function handleViewDetails() {
    navigate(`/products/${product?.id}`); // Navigate to the product details page
  }
  return (
    <section className="singleProduct">
      <input type="hidden" value={product?.id} />
      <p className="productImage">
        <img src={product?.imageUrl} />
      </p>
      <div className="productName">{product?.name}</div>
      <div className="productCategory">{product?.category?.name}</div>
      <div className="productPrice">{currencyFormat(product?.price)}</div>
      <button className="viewDetailsBtn" onClick={handleViewDetails}>
        View details
      </button>
    </section>
  );
}
