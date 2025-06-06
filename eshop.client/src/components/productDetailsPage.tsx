import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { useUserId } from "../hooks/useUserId";
import { Product } from "../types/product";
import { ShoppingCart } from "../types/shopingCart";
import { addItemsToCart } from "../utils/cart.service";
import { currencyFormat } from "../utils/formatter";
import { httpGet } from "../utils/service";
import { ProductCounter } from "./productCounter";
import { ProductRating } from "./productRating";

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL
  const userId = useUserId();

  const navigate = useNavigate();
  const appContext = useApp();

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    httpGet("product", id).then((res) => {
      setProduct(res);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, []);

  async function handleProduct() {
    if (userId && id) {
      const cartItem: ShoppingCart = {
        userId: userId,
        items: [
          {
            productId: id,
            quantity: quantity,
          },
        ],
      };
      addItemsToCart(cartItem, appContext).catch((err) => console.error(err));
    }
  }
  function addToCart() {
    handleProduct().then(() => {
      setShowNotification(true);
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    });
  }

  function buyClickHandler() {
    handleProduct().then(() => {
      navigate("/checkout");
    });
  }
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity); // Update the quantity in the parent state
  };
  return (
    <>
      {product && (
        <div>
          <main className="productSection">
            <section>
              <div className="productInfo">
                <div>
                  <img style={{ width: "300px" }} src={product.imageUrl} alt={product.name} />
                </div>
                <div className="productDataContainer">
                  <div className="priceContainer">{currencyFormat(product.price)}</div>
                  <div className="productDescription">{product.description}</div>
                </div>
              </div>
              <hr />
              <section>
                <ProductRating />
              </section>
            </section>
            <div className="buySection">
              <div className="info">
                <label>Sold by:</label>
                <div>Fake Seller</div>
              </div>
              <div className="info">
                <label>Ship to:</label>
                <div>Fake Address</div>
              </div>
              <div className="info">
                <label>Quantity:</label>
                <div>
                  <ProductCounter onQuantityChange={handleQuantityChange} value={1} />
                </div>
              </div>

              <button className="buyBtn" onClick={buyClickHandler}>
                Buy
              </button>
              <button className="addToCartBtn" onClick={addToCart}>
                Add to cart
              </button>
              <div
                className="cartNotification"
                style={{
                  opacity: showNotification ? 1 : 0,
                }}
              >
                ✓ The product was added to shopping cart
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
