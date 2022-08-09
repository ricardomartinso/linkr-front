import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;1,100;1,300;1,400;1,700&family=Oswald:wght@200;300;400;500;600;700&family=Passion+One:wght@400;700&display=swap');
  *{
    box-sizing:border-box;
  }

  body{
    background-color: #E5E5E5;
  }
  .root {
    background-color: #E5E5E5;
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
