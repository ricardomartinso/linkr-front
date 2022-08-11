import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
   }

  body, html{
    font-size: 16px;
  }

  body{
    background-color:#333333;
  }

  .root {
    background-color: #333333;
    display:flex;
    flex-direction:column;
    align-items:center;
    font-family:  'Lato', sans-serif;
  }

  .root button, input {
    font-family:  'Oswald', sans-serif;
  }
  
`;

export default GlobalStyle;
