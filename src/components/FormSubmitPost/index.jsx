import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import getPosts from "../../data/getPosts.jsx";
import { getConfig } from "../../utils/apiUtils";
import { getApiUrl } from "../../utils/apiUtils";

export default function CreatePost({ setMessageError, getPostsToReload }) {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { token } = useContext(UserContext);

  async function submitPost(e) {
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

      await axios.post(
        "https://linkr-backend-30.herokuapp.com/post",
        post,
        auth
      );

      await getPostsToReload();
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
  );
}

const AddPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 180px;
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
