import styled from "styled-components";

const InputBar = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 0 17px;
  background: #ffffff;
  border-radius: 8px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #c6c6c6;
`;

const SearchContainer = styled.div`
  display: flex;
  position: fixed;
  top: 16px;
  left: 30%;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  width: 40%;
  max-width: 600px;
  height: auto;
  max-height: 176px;
  background-color: transparent;
`;

const SearchResultsPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  width: 100%;
  padding: 8px;
  overflow-y: scroll;
  max-width: 563px;
  height: auto;
  max-height: 131px;
  background-color: #e7e7e7;
  border: 1px solid #e7e7e7;
  border-radius: 0px 0px 5px 5px;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 12px;
  padding-left: 4px;
  background-color: #e7e7e7;

  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #515151;

  img {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(0.6);
  }
`;

export { InputBar, SearchContainer, SearchResultsPanel, SearchResult };
