import styled from "styled-components";

const TopBar = styled.nav`
  display: flex;
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  left: 0px;
  top: 0px;
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
`;

export{ MenuContainer, ProfileImg, TopBar };
