import styled from "styled-components";
import { useState, useContext, useEffect, useInsertionEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import Post from "../../components/Post";
import getPosts from "../../data/getPosts.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function Timeline() {
  const { token, userName, picture } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    async function pullPosts() {
      const { resp: response } = await getPosts();
      setPosts(response.data);
    }
    pullPosts()
  }, [])



  async function submitPost(e) {
    console.log('executou oo submit')
    e.preventDefault();
    setIsSubmiting(true);

    try {
      const post = {
        description,
        link,
      };
      const auth = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const promise = await axios.post(
        "https://linkr-backend-30.herokuapp.com/post",
        post,
        auth
      );

      setMessageError("");
      setDescription("");
      setLink("");
      setIsSubmiting(false);
    } catch (error) {
      setMessageError("Houve um erro ao adicionar seu post!");
      setIsSubmiting(false);
      console.log(error);
    }
  }

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
          <AddPost>
            <Form onSubmit={submitPost}>
              <p>What are you going to share today?</p>
              <input
                className="link-input"
                type="url"
                placeholder="http://..."
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                required
              />
              <input
                className="description-input"
                type="text"
                placeholder="Awesome article about #javascript"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <div className="button-div">
                {isSubmiting ? (
                  <button disabled={true}>Publishing...</button>
                ) : (
                  <button>Publish</button>
                )}
              </div>
            </Form>
          </AddPost>
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
    margin-top: 10px;
  }

  input {
    width: 100%;
    height: 30px;
    background-color: #efefef;
    border-radius: 5px;
    color: #949494;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    margin-top: 5px;
    padding-left: 9px;
  }
  .description-input {
    height: 47px;
  }

  .button-div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  button {
    width: 112px;
    height: 22px;

    background: #1877f2;
    color: white;

    font-size: 14px;
    margin: 4px 0 6px 6px;
    border: none;
    border-radius: 5px;
  }

  @media (min-width: 800px) {
    border-radius: 10px;
    height: 209px;

    .description-input {
      height: 66px;
    }
    button {
      margin-top: 9px;
    }
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
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
