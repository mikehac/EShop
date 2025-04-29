import "./App.css";
import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { Orders } from "./components/orders";
import { AppProvider, useAppContext } from "./AppContext";
import { Header } from "./components/header";

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}
