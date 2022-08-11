import React from "react";
import "./assets/styles/reset.css";
import GlobalStyle from "./assets/styles/globalStyle";
import Login from "./pages/Login";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Timeline from "./pages/Timeline";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        picture,
        setPicture,
        userName,
        setUserName,
      }}
    >
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
