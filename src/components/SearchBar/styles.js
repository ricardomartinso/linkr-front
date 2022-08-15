import styled from "styled-components";

const InputBar = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 0 17px;
  background: #FFFFFF;
  border-radius: 8px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #C6C6C6;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  max-width: 563px;
  height: auto;
  max-height: 176px;
  background-color: transparent;
`;

export {InputBar, SearchContainer}