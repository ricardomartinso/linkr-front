import styled from "styled-components";

const TextErr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  background-color: #151515;
  border: 1px solid #151515;
  border-radius: 6px;
  color: #ffffff;
  font-family: "Lato";
  width: 300px;
  font-size: 16px;
  height: 120px;
  padding: 10px;
  line-height: 20px;
  p {
    border: 1px solid #ffffff;
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 130px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 6.5rem auto 0 auto;
  height: 100%;

  h1 {
    font-family: "Passion One", sans-serif;
    color: white;
    font-size: 33px;
    margin: 0 0 1.5rem 1.75rem;
    width: 100%;
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 43px;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  margin-top: 60px;
  align-items: center;
  display: flex;
`;

const Posts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  overflow: auto;
  .searchbar-mobile{
    display: none;
  }

  @media (min-width: 800px) {
    width: 611px;
  }
`;

const PostError = styled.div`
  display: flex;
  align-items: center;
`;

const PopUpError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 17px;
  width: 70%;
  color: red;
  padding: 5px 0;
  margin-bottom: 10px;
`;

export {Container, Loader, PopUpError, PostError, Posts, TextErr, Title}