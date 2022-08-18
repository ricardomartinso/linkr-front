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
import { getApiUrl, getConfig } from "../../utils/apiUtils";
import ReloadPosts from "../../components/ReloadPosts";
import SearchBarMobile from "../../components/SearchBar/SearchBarMobile";
import { Container, Loader, PopUpError, Posts, TextErr, Title } from "./styles";
import InfiniteScroll from 'react-infinite-scroller';

export default function Timeline() {
  const { token } = useContext(UserContext);
  const [messageError, setMessageError] = useState("");
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("There are no posts yet");
  const [reload, setReload] = useState(0);
  const [oldPosts, setOldPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function pullPosts(page) {
    const { resp: response, status } = await getPosts(token);
    
    if (status) {
      console.log("entrou no if")
      if (response.data.length === 0) {
        console.log("entrou no segundo if")
        setAlert(true);
      } else {
        await postsToReload();
        setReload(0);
        const newPosts = [...posts, response.data]
        setPosts(...newPosts);
      }
      setSwap(false);
    } else {
      setAlert(true);
      setSwap(false);
      setText(response.response.data);
    }
  }

  function renderPosts() {
    console.log(posts);
    return (
      posts.map((post) => {
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
    }))
  }

  async function loadMore(page) {
    console.log(page);
    await pullPosts(page);
    //console.log(posts);
    setHasMore(false);
    renderPosts();
    setHasMore(true);
  }

  async function postsToReload() {
    const config = getConfig(token);
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
    const config = getConfig(token)
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
                  <InfiniteScroll
                    className="infinite"
                    pageStart={0}
                    loadMore={(page) => loadMore(page)}
                    hasMore={true}
                    loader={
                      <Loader key={2}>
                        <BallTriangle color="#ffffff" height={100} width={100} />
                      </Loader>
                    }
                  >
                  <div>
                    {posts.length ? renderPosts() : null}
                  </div>
                 </InfiniteScroll>
                )}
              </div>
            )}
        </Posts>

        <Sidebar />
      </Container>
    </>
  );
}
