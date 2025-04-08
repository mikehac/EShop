import "./App.css";
import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { Orders } from "./components/orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
