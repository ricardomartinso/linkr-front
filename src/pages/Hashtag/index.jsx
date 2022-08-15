import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import getOneHashtag from "../../data/getOneHashtag";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import { useParams } from 'react-router-dom';

export default function Hashtag() {
  const { token } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [swap, setSwap] = useState(true);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("There are not posts yet");
  const { tag } = useParams();

  async function pullPosts() {
    const { resp: response, status } = await getOneHashtag(token, tag);
    if (status) {
      if (response.data.length === 0) {
        setAlert(true);
      } else {
        setPosts(response.data[0].postList);
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
          <Title><h1>{'#' + tag}</h1></Title>
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


      </Container>
    </>
  );
}

const Title = styled.div`
  width:100%;
  align-items: center;
  display: flex;
  margin-top:22px;
  margin-bottom:30px;
`

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
