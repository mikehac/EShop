import "./App.css";
import "./styles/index.scss";
import Login from "./components/login";
import { Header } from "./components/header";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProductsPage } from "./components/productsPage";
import { ProductDetailsPage } from "./components/productDetailsPage";
import { useAuth } from "./hooks/useAuth";
import { UserDetailsPage } from "./components/userDetailsPage";
import { CheckoutPage } from "./components/checkoutPage";
import { ShoppingCartPage } from "./components/shoppingCartPage";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevents flickering
  return (
    <>
      <Header />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          {/* Protected Routes */}
          <Route path="/user" element={isAuthenticated ? <UserDetailsPage /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="/cart" element={<ShoppingCartPage />} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
