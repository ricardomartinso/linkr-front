import React from "react";
import "./assets/styles/reset.css";
import GlobalStyle from "./assets/styles/globalStyle";
import Login from "./pages/Login";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContext from "./contexts/LoginContext";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [nomeUsuario, setNomeUsuario] = useState(
    localStorage.getItem("nomeUsuario")
  );
  const [fotoUsuario, setFotoUsuario] = useState(
    localStorage.getItem("fotoUsuario")
  );

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
        fotoUsuario,
        setFotoUsuario,
        nomeUsuario,
        setNomeUsuario,
      }}
    >
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}
