import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/index.scss";
import Login from "./login";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />
      <Login />
    </>
  );
}

export default App;
