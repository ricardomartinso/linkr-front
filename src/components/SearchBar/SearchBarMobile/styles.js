import styled from "styled-components";

const ContainerMobile = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  top: 70px;
  left: 0;
  z-index: 1;
  margin: 0px 0 30px 0;
  padding: 5px 12px;
  box-sizing: border-box;
  background-color: #333333;
;

  .searchbar-mobile {
    display: none;
    @media (max-width: 799px) {
      display: flex;
      position: initial;
      width:100%;
      max-width: auto;
    }
  }
`;

export{ ContainerMobile };