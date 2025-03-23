import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGet, httpPost } from "../utils/service";
import { Product } from "../types/product";
import { currencyFormat } from "../utils/formatter";
import { ProductCounter } from "./productCounter";

export function ProductDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1); // State to store the quantity
  const [userId, setUserId] = useState<string | null>("");
  useEffect(() => {
    httpGet("product", id).then((res) => {
      setProduct(res);
    });
  }, []);

  useEffect(() => {
    httpGet("auth/me").then((data) => {
      setUserId(data.id);
    });
  }, []);

  function addToCart() {
    const cartItem = {
      userId: userId,
      items: [
        {
          productId: id,
          quantity: quantity,
        },
      ],
    };
    httpPost("cart", cartItem)
      .then((res) => {
        console.log(res);
        navigate("/checkout");
      })
      .catch((err) => console.error(err));
    console.log(cartItem);
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity); // Update the quantity in the parent state
  };
  return (
    <>
      {product && (
        <section className="productSection">
          <div>
            <img style={{ width: "300px" }} src={product.imageUrl} alt={product.name} />
          </div>
          <div className="productDataContainer">
            <div className="priceContainer">{currencyFormat(product.price)}</div>
            <div className="productDescription">{product.description}</div>
          </div>
          <div className="buySection">
            <div>
              <label>Sold by:</label>
            </div>
            <div>
              <label>Ship to:</label>
            </div>
            <div>
              <label>Quentity:</label>
              <div>
                <ProductCounter onQuantityChange={handleQuantityChange} />
              </div>
            </div>
            <button className="buyBtn">Buy</button>
            <button className="addToCartBtn" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </section>
      )}
    </>
  );
}
