import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { httpPost } from "../utils/service";
import { useEffect, useState } from "react";
export function Header({ showMenu }: { showMenu: boolean }) {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  useEffect(() => {
    setLoggedIn(showMenu);
  }, [loggedIn]);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    httpPost("auth/logout").then((res) => {
      console.log(res);
      if (res.success) {
        navigate("/");
      }
    });
  };
  return (
    <header className="header">
      {loggedIn && (
        <Link to="/home" onClick={handleLogoClick}>
          LogOut
        </Link>
      )}
      <img src={logo} alt="eShop Logo" className="logo" />
      <h2>My e-Shop</h2>
      <nav>
        <ul className="nav-links" style={{ display: loggedIn ? "flex" : "none" }}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
