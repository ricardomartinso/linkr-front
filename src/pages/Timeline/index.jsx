import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import useInterval from "use-interval";
import Header from "../../components/Header";
import Post from "../../components/Post";
import getPosts from "../../data/getPosts.jsx";
import Sidebar from "../../components/Sidebar";
import CreatePost from "../../components/FormSubmitPost";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";
import ReloadPosts from "../../components/ReloadPosts";
import SearchBarMobile from "../../components/SearchBar/SearchBarMobile";

export default function Timeline() {
  const { token } = useContext(UserContext);
  const [messageError, setMessageError] = useState("");
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("There are no posts yet");
  const [reload, setReload] = useState(0);
  const [oldPosts, setOldPosts] = useState([]);

  async function pullPosts() {
    const { resp: response, status } = await getPosts(token);
    if (status) {
      if (response.data.length === 0) {
        setAlert(true);
      } else {
        await postsToReload();
        setReload(0);
        setPosts(response.data.postList);
      }
      setSwap(false);
    } else {
      setAlert(true);
      setSwap(false);
      setText(response.response.data);
    }
  }
  async function postsToReload() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const API_URL = getApiUrl(`posts/reload`);
    const promise = axios.get(API_URL, config);

    promise.then((res) => {
      setOldPosts(res.data);
    });
  }

  useEffect(() => {
    pullPosts();
  }, []);

  useInterval(() => {
    console.log("rodou 15seg");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const API_URL = getApiUrl(`posts/reload`);
    const promise = axios.get(API_URL, config);

    promise.then((res) => {
      const updatedPosts = res.data;

      if (updatedPosts.length > oldPosts.length) {
        const reload = updatedPosts.length - oldPosts.length;
        setReload(reload);
        console.log(`Há ${reload} novos!`);
      }
    });
  }, 15000);

  return (
    <>
      <Header></Header>
      <Container>
        <Posts>
          <SearchBarMobile />
          <Title>
            <h1>Timeline</h1>
          </Title>
          {messageError === "" ? (
            <></>
          ) : (
            <PopUpError>{messageError}</PopUpError>
          )}
          <CreatePost setPosts={setPosts} setMessageError={setMessageError} />
          {reload >= 1 ? (
            <ReloadPosts
              reload={reload}
              reloadFunction={pullPosts}
              //recarregar posts with pull posts
              //setOldPosts(res.data)
            />
          ) : (
            <></>
          )}
          {swap ? (
            <Loader>
              <BallTriangle color="#ffffff" height={100} width={100} />
            </Loader>
          ) : (
            <div>
              {alert ? (
                <TextErr>
                  <p>{text}</p>
                </TextErr>
              ) : (
                <div>
                  {posts?.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        postId={post.id}
                        userId={post.user.id}
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
