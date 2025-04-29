import { useEffect, useState } from "react";
import { logout } from "../utils/service";

export function Header() {
  const [hasToken, setHasToken] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return !!token; // Check if token exists in localStorage
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setHasToken(!!token);
  }, []);

  const handleLogOutClick = () => {
    logout().then((res) => {
      res.json().then((data) => {
        if (data.success) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("totalItemsInCart");
          setHasToken(false); // Update state when logging out
          window.location.href = "/";
        }
      });
    });
  };
  return (
    hasToken && (
      <header className="header">
        {/* <div className="logo">eshop</div> */}
        <nav className="nav">
          <ul>
            <li>
              <a href="/orders">Orders</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/customers">Customers</a>
            </li>
            <li>
              <a href="/reports">Reports</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>
        <a className="logout" onClick={handleLogOutClick}>
          LogOut
        </a>
      </header>
    )
  );
}
