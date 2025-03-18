import logo from "../assets/logo.png";
export function Header() {
  return (
    <header className="header">
      <img src={logo} alt="eShop Logo" className="logo" />
      <h2>My e-Shop</h2>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Cart</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
