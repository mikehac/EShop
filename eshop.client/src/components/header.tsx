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
