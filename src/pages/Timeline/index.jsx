import styled from "styled-components";
import { useState, useContext, useEffect, useInsertionEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import getPosts from "../../data/getPosts.jsx";
import Sidebar from "../../components/Sidebar";
import CreatePost from "../../components/FormSubmitPost";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {
  const { token } = useContext(UserContext);
  const [messageError, setMessageError] = useState("");
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("There are no posts yet");

  async function pullPosts() {
    console.log("carregou os posts");
    const { resp: response, status } = await getPosts(token);
    if (status) {
      if (response.data.length === 0) {
        setAlert(true);
      } else {
        setPosts(response.data);
      }
      setSwap(false);
    } else {
      setAlert(true);
      setText(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  useEffect(() => {
    pullPosts();
  }, []);

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
          <CreatePost setPosts={setPosts} setMessageError={setMessageError} />
          {swap ? (
            <Loader>
              <BallTriangle color="#ffffff" height={100} width={100} />
            </Loader>
          ) : (
            <div>
              {alert ? (
                <TextErr>{text}</TextErr>
              ) : (
                <div>
                  {posts?.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        postId={post.id}
                        picture={post.user.picture}
                        likes={post.postLikes.count}
                        userLiked={post.postLikes.isLiked}
                        latestLikes={post.postLikes.usernameList}
                        username={post.user.username}
                        description={post.description}
                        link={post.link}
                        pullPosts={pullPosts}
                        setPosts={setPosts}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Posts>

        <Sidebar />
      </Container>
    </>
  );
}

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
  padding: 0px 18px;
  line-height: 20px;
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
  h1{
    width: 100%;
    align-items: left;
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
