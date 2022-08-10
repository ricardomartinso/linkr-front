import styled from "styled-components";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function Timeline() {
  return (
    <>
      <Header></Header>
      <Container>
        <h1>Timeline</h1>

        <Posts>
          <AddPost>
            <Form>
              <p>What are you going to share today?</p>
              <input type="url" name="" id="" placeholder="http://..." />
              <input
                type="text"
                name=""
                id=""
                placeholder="Awesome article about #javascript"
              />
              <div className="button-div">
                <button>Publish</button>
              </div>
            </Form>
          </AddPost>
          <Post>POST</Post>
          <Post>POST 2</Post>
          <Post>POST 3</Post>
          <Post>POST 4</Post>
        </Posts>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 6.5rem;

  h1 {
    font-family: "Passion One", sans-serif;
    color: white;
    font-size: 33px;
    margin: 0 0 1.5rem 1.75rem;
  }
`;
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 164px;
  background-color: white;
  margin-bottom: 18px;

  font-family: "Lato", "sans-serif";

  p {
    color: #707070;
    font-size: 20px;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 35px;
    background-color: #efefef;
    border-radius: 5px;
    color: #949494;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    margin-top: 5px;
    padding-left: 9px;
  }

  .button-div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  button {
    width: 112px;
    height: 24px;

    background: #1877f2;
    color: white;

    font-size: 14px;
    margin: 12px 0 6px 0;
    border: none;
    border-radius: 5px;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
`;
const Post = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 232px;
  background-color: black;
  margin-bottom: 18px;
`;
