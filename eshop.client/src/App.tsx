import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";
import { CheckoutPage } from "./components/checkoutPage";
import { Header } from "./components/header";
import Login from "./components/login";
import { ProductDetailsPage } from "./components/productDetailsPage";
import { ProductsPage } from "./components/productsPage";
import { Register } from "./components/register";
import { ShoppingCartPage } from "./components/shoppingCartPage";
import { UserDetailsPage } from "./components/userDetailsPage";
import "./styles/index.scss";
import { OrdersPage } from "./components/ordersPage";
import { useApp } from "./hooks/useApp";

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useApp();

  if (loading) return <div>Loading, Please wait, it could take few minutes because of render.com policy for free hosting</div>; // Prevents flickering

  return (
    <>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/products" element={isAuthenticated ? <ProductsPage /> : <Navigate to="/" />} />
        <Route path="/products/category/:id" element={isAuthenticated ? <ProductsPage /> : <Navigate to="/" />} />
        <Route path="/products/:id" element={isAuthenticated ? <ProductDetailsPage /> : <Navigate to="/" />} />
        <Route path="/user" element={isAuthenticated ? <UserDetailsPage /> : <Navigate to="/" />} />
        <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/" />} />
        <Route path="/cart" element={isAuthenticated ? <ShoppingCartPage /> : <Navigate to="/" />} />
        <Route path="/orders" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
