import styled from "styled-components";
import { useState, useContext, useEffect, useInsertionEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import Post from "../../components/Post";
import getPosts from "../../data/getPosts.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import CreatePost from "../../components/FormSubmitPost";

export default function Timeline() {
  const [messageError, setMessageError] = useState("");
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    async function pullPosts() {
      const { resp: response } = await getPosts();
      setPosts(response.data);
    }
    pullPosts()
  }, [])

  return (
    <>
      <Header></Header>
      <Container>
        <Posts>
          <h1>Timeline</h1>
          {messageError === "" ? (
            <></>
          ) : (
            <PopUpError>{messageError}</PopUpError>
          )}
          <CreatePost />

          {posts.map((post) => {
            return (
              <Post key={post.id}
                picture={post.user.picture}
                likes={post.postLikes.count}
                username={post.user.username}
                description={post.description}
                link={post.link}
              />
            );
          })}
        </Posts>

        <Sidebar />
      </Container>
    </>
  );
}

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
  }
  @media (min-width: 800px) {
    h1 {
      font-size: 43px;
    }
  }
`;
const Posts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;

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
