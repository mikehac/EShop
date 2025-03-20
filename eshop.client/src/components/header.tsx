import logo from "../assets/logo.png";
export function Header({ showMenu }: { showMenu: boolean }) {
  return (
    <header className="header">
      <img src={logo} alt="eShop Logo" className="logo" />
      <h2>My e-Shop</h2>
      <nav>
        <ul className="nav-links" style={{ display: showMenu ? "flex" : "none" }}>
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
