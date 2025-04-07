import "./App.css";
import "./styles/index.scss";
import Login from "./components/login";
import { Header } from "./components/header";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProductsPage } from "./components/productsPage";
import { ProductDetailsPage } from "./components/productDetailsPage";
import { useAuth } from "./hooks/useAuth";
import { UserDetailsPage } from "./components/userDetailsPage";
import { CheckoutPage } from "./components/checkoutPage";
import { ShoppingCartPage } from "./components/shoppingCartPage";
import { Register } from "./components/register";
import { createContext } from "react";
import { AppProvider } from "./AppContext";

function App() {
  const { isAuthenticated, loading } = useAuth();
  const itemsCartContext = createContext({ totalItemsInCart: 0 });

  if (loading) return <div>Loading...</div>; // Prevents flickering
  return (
    <AppProvider>
      <Header showMenu={isAuthenticated} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/category/:id" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        {/* Protected Routes */}
        <Route path="/user" element={isAuthenticated ? <UserDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<ShoppingCartPage />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
