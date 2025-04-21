import { Link, useNavigate } from "react-router-dom";
import { httpPost, logout } from "../utils/service";
import { useEffect, useState } from "react";
import { useApp } from "../hooks/useApp";
export function Header({ showMenu }: { showMenu: boolean }) {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const { totalItemsInCart } = useApp();
  useEffect(() => {
    setLoggedIn(showMenu);
  }, [loggedIn]);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    logout().then((res) => {
      res.json().then((data) => {
        if (data.success) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("totalItemsInCart");
          navigate("/");
        }
      });
    });
  };
  return (
    <header className="header">
      <nav className="menuNav">
        <ul className="nav-links" style={{ display: loggedIn ? "flex" : "none" }}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/checkout">Cart</a>
            <span className="cartCount" style={{ display: loggedIn ? "inline" : "none" }}>
              {totalItemsInCart} {/* Replace this with the actual item count */}
            </span>
          </li>
          <li>
            <a href="/user">My details</a>
          </li>
        </ul>
      </nav>
      {/* <img src={logo} alt="eShop Logo" className="logo" /> */}
      {loggedIn && (
        <Link className="logout-link" to="/home" onClick={handleLogoClick}>
          LogOut
        </Link>
      )}
    </header>
  );
}
