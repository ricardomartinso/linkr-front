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
  const [alertErrFollower, setAlertErrFollower] = useState(false);
  const [textErrFollower, setTextErrFollower] = useState("");
  const [text, setText] = useState("");
  const [reload, setReload] = useState(0);
  const [oldPosts, setOldPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function pullPosts(page = 1) {
    const { resp: response, status } = await getPosts(token, page);
    if (status) {
      if (response.data.errFollower !== "") {
        setAlertErrFollower(true);
        setTextErrFollower(response.data.errFollower);
      }
      if (response.data.postList.length === 0) {
        setAlert(true);
      } else {
        await postsToReload();
        setReload(0);

        const newPosts = [...posts, ...response.data.postList]
        const { length } = response.data[response.data.length-1];
        if (posts.length === length) {
          setHasMore(false);
        }
        newPosts.pop();
        setPosts(newPosts);

      }
      setSwap(false);
    } else {
      setAlert(true);
      setSwap(false);
      setText(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  function renderPosts() {
    //console.log(posts);
    return (
      posts.map((post, index) => {
        //console.log(post);
        return (
          <Post
            key={index}
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
    console.log(posts);
    //setHasMore(false);
    renderPosts();
    //setHasMore(true);
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
    postsToReload();
    pullPosts();
  }, []);

  useInterval(() => {

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
                    pageStart={1}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={
                      <Loader key={2}>
                        <BallTriangle color="#ffffff" height={100} width={100} />
                      </Loader>
                    }
                  >
                  <>
                    {posts.length ? renderPosts() : null}
                  </>
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

