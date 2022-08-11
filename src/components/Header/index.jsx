import { MenuContainer, ProfileImg, TopBar } from "./styles";
import { IoChevronDown as MenuIcon } from "react-icons/io5";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Header() {
  const { picture } = useContext(UserContext);
  return (
    <TopBar>
      <h1 className="logo">Linkr</h1>
      <MenuContainer>
        <MenuIcon className="menu-icon"/>
        { picture ? 
          <ProfileImg src={picture} alt="imagem de perfil"/> 
          : ''
        }
      </MenuContainer>
    </TopBar>
  );
}
