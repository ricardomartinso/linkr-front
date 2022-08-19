import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import getOneHashtag from "../../data/getOneHashtag";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import InfiniteScroll from "react-infinite-scroller";

export default function Hashtag() {
  const { token } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [Alert, setAlert] = useState(false);
  const [text, setText] = useState("There are not posts yet");
  const { tag } = useParams();
  const [hasMore, setHasMore] = useState(true);

  async function pullPosts(startId) {
    const { resp: response, status } = await getOneHashtag(token, tag, startId);

    if (status) {
      if (response.data.length === 0) {
        setAlert(true);
      } else {
        const newPosts = [...posts, ...response.data.postList];
        const { length } = response.data;
        if (newPosts.length === length) {
          setHasMore(false);
        }
        setPosts(response.data.postList);
      }
      setSwap(false);
    } else {
      setAlert(true);
      setText(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  function renderPosts() {
    return posts.map((post) => {
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
    });
  }
  async function loadMore(page) {
    if (page > 1) {
      const startId = posts[posts.length - 1].id;
      await pullPosts(startId);
    } else {
      await pullPosts();
    }
    renderPosts();
  }

  useEffect(() => {
    pullPosts();
  }, [tag]);

  return (
    <>
      <Header />
      <Container>
        <Posts>
          <SearchBar
            className="searchbar-mobile"
            placeholder="Search for people and friends"
          />
          <Title>
            <h1>{"#" + tag}</h1>
          </Title>
          {swap ? (
            <Loader>
              <BallTriangle color="#ffffff" height={100} width={100} />
            </Loader>
          ) : (
            <div>
              {Alert ? (
                <TextErr>{text}</TextErr>
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
                  <>{posts.length ? renderPosts() : null}</>
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

const Title = styled.div`
  width: 90%;
  align-items: center;
  display: flex;
  margin-top: 22px;
  margin-bottom: 30px;
`;

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
    width: 100%;
    align-items: left;
  }

  @media (min-width: 800px) {
    width: 611px;
  }

  .searchbar-mobile {
    display: none;
    @media (max-width: 799px) {
      display: flex;
      width: 90%;
      margin: 5px 0 30px 0;
    }
  }
`;
