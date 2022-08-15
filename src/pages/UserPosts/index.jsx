import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import getPostsByUser from "../../data/getPostsByUser";
import Sidebar from "../../components/Sidebar";

export default function UserPosts() {
  const { token } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("There are not posts yet");
  const { username } = useParams();

  async function pullPosts() {
    const { resp: response, status } = await getPostsByUser(username);
    if (status) {
      if (response.data.length === 0) {
        setAlert(true);
      } else {
        console.log(response.data);
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
          <h1>{username} posts</h1>
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
                  {posts.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        postId={post.id}
                        picture={post.user.picture}
                        likes={post.postLikes.count}
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
    width: 80%;
  }
  @media (min-width: 800px) {
    h1 {
      font-size: 43px;
      width: 80%;
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
  h1 {
    width: 90%;
    align-items: left;
  }

  @media (min-width: 800px) {
    width: 611px;
  }
`;