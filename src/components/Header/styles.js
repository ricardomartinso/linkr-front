import styled from "styled-components";

const TopBar = styled.nav`
  display: flex;
  position: fixed;
  z-index: 2;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  left: 0;
  top: 0;
  padding: 0 0.4375rem 0 1.75rem ;
  box-sizing: border-box;
  background: #151515;

  .logo{
    font-family: 'Passion One', sans-serif;
    font-weight: 700;
    font-size: 3.0625rem;
    line-height: 3.375rem;
    letter-spacing: 0.05em;
    color: #FFFFFF;
  }
`;

const ProfileImg = styled.img`
  width: 3.3125rem;
  height: 3.3125rem;
  object-fit: cover;
  border-radius: 1.6563rem;

  &:hover{
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: auto;
  gap: 0.75rem;

  .menu-icon{
    color: #FFFFFF;
    font-size: 1.5625rem;
  }

  .menu-icon:hover{
    cursor: pointer;
  }

  .menu-opened{
    transform: rotate(180deg);
    transition: transform 330ms ease-in-out;
  }

  .menu-closed{
    transform: rotate(0deg);
    transition: transform 330ms ease-in-out;
  }
`;

const PageContainer = styled.div`
  display: none;
  position: fixed;
  right: 0;
  top: 4.5rem;
  z-index: 1;
  width: 100%;
  height: calc(100vh - 4.5rem);
  background-color: transparent;

  &.menu-opened{
    display: flex;
    justify-content: right;
  }
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //z-index: 1;
  width: 150px;
  height: 47px;
  left: 1307px;
  top: 72px;
  background: #171717;
  border-radius: 0 0 0 20px;

  p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;

    color: #FFFFFF;
  }

  p:hover{
    cursor: pointer;
  }
`;

export{ LogoutButton, MenuContainer, PageContainer, ProfileImg, TopBar };
