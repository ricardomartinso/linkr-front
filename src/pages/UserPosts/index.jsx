import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import getPostsByUser from "../../data/getPostsByUser";
import Sidebar from "../../components/Sidebar";
import SearchBarMobile from "../../components/SearchBar/SearchBarMobile";
import setFollow from "../../data/setFollow";
import deleteFollow from "../../data/deleteFollow";
import { getStatusFollow } from "../../data/getStatusFollow";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPosts() {
  const { token, userName } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [follower, setFollower] = useState(null);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [picture, setPicture] = useState("");
  const [Alert, setAlert] = useState(false);
  const [text, setText] = useState("There are not posts yet");
  const [pageName, setPageName] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();

  async function pullPosts(startId) {
    const { resp: response, status } = await getPostsByUser(id, startId);

    if (status) {
      setPageName(response.data.userInfo.username);
      setPicture(response.data.userInfo.picture);
      if (response.data.postList.length === 0) {
        setPosts([]);
        setAlert(true);
      } else {
        const newPosts = [...posts, ...response.data.postList];
        const { length } = response.data;
        if (newPosts.length === length) {
          setHasMore(false);
        }
        setPosts(newPosts);
        setAlert(false);
      }
      setSwap(false);
    } else {
      setAlert(true);
      setText(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  async function statusFollow() {
    const status = await getStatusFollow(id, token);
    setFollower(status.data);
  }

  async function unfollow() {
    setButtonIsDisabled(true);
    const resp = await deleteFollow(id, token);
    setButtonIsDisabled(false);
    if (resp.status === 200) {
      setFollower(true);
    } else {
      alert("não foi possivel executar essa operação");
    }

    return resp;
  }

  async function follow() {
    setButtonIsDisabled(true);
    const resp = await setFollow(id, token);
    setButtonIsDisabled(false);
    if (resp.status === 201) {
      setFollower(false);
    } else {
      alert("não foi possivel executar essa operação");
    }
    return resp;
  }

  function renderButton() {
    return follower ? (
      <Follow disabled={buttonIsDisabled} onClick={follow}>
        Follow
      </Follow>
    ) : (
      <UnFollow disabled={buttonIsDisabled} onClick={unfollow}>
        Unfollow
      </UnFollow>
    );
  }

  useEffect(() => {
    pullPosts();
    statusFollow();
  }, [id]);

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

  return (
    <>
      <Header></Header>
      <Container>
        <Title>
          <ProfileImg src={picture} alt="imagem de perfil" />
          <h1>{pageName}'s posts</h1>
          {follower === null || pageName === userName ? null : renderButton()}
        </Title>

        <Div>
          <Posts>
            <SearchBarMobile />

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
                        <BallTriangle
                          color="#ffffff"
                          height={100}
                          width={100}
                        />
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
        </Div>
      </Container>
    </>
  );
}
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;
  align-items: center;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  @media (max-width: 799px) {
      width:100%;
      padding:50px 12px 0px 12px;
    }

  h1 {
    font-family: "Passion One", sans-serif;
    color: white;
    font-size: 33px;
    margin: 0 0 0 1.75rem;
    width: 80%;
  }

  @media (max-width: 815px) {
    width: 100%;
    padding: 0 12px;
    margin-top: 2.75rem;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;
const Follow = styled.button`
  width: 112px;
  height: 31px;
  background: #1877f2;
  color: #ffffff;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  border-radius: 5px;
  border: none;
  &:disabled {
    filter: brightness(1.5);
  }

`;

const UnFollow = styled.button`
  width: 112px;
  height: 31px;
  background: #ffffff;
  color: #1877f2;

  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  border-radius: 5px;
  border: none;
  &:disabled {
    filter: brightness(0.5);
  }
`;
const ProfileImg = styled.img`
  width: 3.3125rem;
  height: 3.3125rem;
  object-fit: cover;
  border-radius: 1.6563rem;
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
  align-items: center;
  flex-direction: column;
  margin: 6.5rem auto 0 auto;
  height: 100%;

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
  .searchbar-mobile {
    display: none;
    @media (max-width: 799px) {
      display: flex;
      width: 80%;
      top: 70px;
      left: 10%;
      margin: 16px 0 30px 0;
    }
  }
`;
