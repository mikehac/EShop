import { useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { logout } from "../utils/service";

export function Header() {
  const { totalItemsInCart, isAuthenticated, setAuth } = useApp();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    logout().then((res) => {
      res.json().then((data) => {
        if (data.success) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("totalItemsInCart");
          // Update authentication state to false
          setAuth(false);
          navigate("/");
        }
      });
    });
  };

  return (
    <header className="header">
      <nav className="menuNav">
        <ul className="nav-links" style={{ display: isAuthenticated ? "flex" : "none" }}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/checkout">Cart</a>
            <span className="cartCount" style={{ display: isAuthenticated ? "inline" : "none" }}>
              {totalItemsInCart}
            </span>
          </li>
          <li>
            <a href="/user">My details</a>
          </li>
          <li>
            <a href="/orders">My Orders</a>
          </li>
        </ul>
      </nav>
      {isAuthenticated && (
        <a className="logout-link" href="#" onClick={handleLogoClick}>
          LogOut
        </a>
      )}
    </header>
  );
}
