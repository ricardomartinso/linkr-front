import {
  LogoutButton,
  MenuContainer,
  PageContainer,
  ProfileImg,
  TopBar,
} from "./styles";
import { IoChevronDown as MenuIcon } from "react-icons/io5";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import userProfile from "../../assets/images/user.svg";
import { useState } from "react";
import { getApiUrl, getConfig } from "../../utils/apiUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function Header() {
  const { picture, setPicture, token, setUserName, setToken } =
    useContext(UserContext);
  const [menuState, setMenuState] = useState("menu-closed");
  const navigate = useNavigate();

  function toggleMenu() {
    if (menuState === "menu-closed") {
      setMenuState("menu-opened");
    } else {
      setMenuState("menu-closed");
    }
  }

  function handleLogout() {
    const API_URL = getApiUrl("logout");
    const config = getConfig(token);
    const promise = axios.put(API_URL, {}, config);
    promise.then(() => {
      toggleMenu();
      localStorage.clear();
      setUserName(null);
      setToken(null);
      setPicture(null);
      navigate("/");
    });
  }

  return (
    <>
      <TopBar>
        <h1 className="logo">linkr</h1>
        <SearchBar
          className="searchbar-desktop"
          placeholder="Search for people"
        />
        <MenuContainer>
          <MenuIcon className={`menu-icon ${menuState}`} onClick={toggleMenu} />
          {
            picture ? (
              <ProfileImg
                src={picture}
                alt="imagem de perfil"
                onClick={toggleMenu}
              />
            ) : (
              <ProfileImg
                src={userProfile}
                alt="imagem de perfil"
                onClick={toggleMenu}
              />
            ) // substituir por '' depois
          }
        </MenuContainer>
      </TopBar>
      <PageContainer className={menuState} onClick={toggleMenu}>
        <LogoutButton>
          <p onClick={handleLogout}>Logout</p>
        </LogoutButton>
      </PageContainer>
    </>
  );
}
