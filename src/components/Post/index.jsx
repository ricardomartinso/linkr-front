import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash as Trash } from "react-icons/io";
import {
  PostStyled,
  PictureLikes,
  PostInfo,
  ModalTitle,
  ButtonsDiv,
  ErrorMessage,
} from "./styles";
import axios from "axios";
import { getApiUrl, getConfig } from "../../utils/apiUtils";
import UserContext from "../../contexts/UserContext";
import linkr from "../../assets/images/linkr.png";
import Modal from "react-modal";
import getPosts from "../../data/getPosts.jsx";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333333",
    width: "600px",
    height: "262px",
    borderRadius: "50px",
  },
};

export default function Post({
  picture,
  description,
  link,
  username,
  likes,
  postId,
  setPosts,
  pullPosts,
}) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { userName, token } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const tagStyle = {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };
  async function pullPosts() {
    const { resp: response } = await getPosts();
    setPosts(response.data);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  async function deletePost() {
    setIsLoading(true);
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const promise = await axios.delete(
        `http://linkr-backend-30.herokuapp.com/posts/${postId}`,
        auth
      );

      await pullPosts();
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      setHasError(true);
      setIsOpen(false);
      setIsLoading(false);
      setTimeout(() => {
        setHasError(false);
      }, 8000);
      console.log(error);
    }
  }

  function likePost() {
    const API_URL = getApiUrl(`post/like/${postId}`);
    const config = getConfig(token);
    const promise = axios.post(API_URL, {}, config);
    promise.then(() => {
      setIsLiked(true);
      pullPosts();
    });
    promise.catch((error) => {
      console.log(error);
    });
  }

  function unlikePost() {
    const API_URL = getApiUrl(`post/like/${postId}`);
    const config = getConfig(token);
    const promise = axios.delete(API_URL, config);
    promise.then(() => {
      setIsLiked(false);
      pullPosts();
    });
    promise.catch((error) => {
      console.log(error);
    });
  }

  const routeChange = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {isLoading ? (
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ModalTitle>Carregando. . .</ModalTitle>
        </Modal>
      ) : (
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ModalTitle>Are you sure you want to delete this post?</ModalTitle>
          <ButtonsDiv>
            <button className="no-button" onClick={closeModal}>
              No, go back
            </button>
            <button className="yes-button" onClick={deletePost}>
              Yes, delete it
            </button>
          </ButtonsDiv>
        </Modal>
      )}
      {hasError ? (
        <ErrorMessage>
          An error has ocurred on deleting your post! Try again.
        </ErrorMessage>
      ) : (
        <></>
      )}

      <PostStyled>
        <PictureLikes>
          <div className="picture">
            <img src={picture} alt="IMG" />
          </div>
          <div className="likes">
            {isLiked ? (
              <IoHeart
                fontSize={"20px"}
                color={"red"}
                onClick={unlikePost}
                className="like-icon"
              />
            ) : (
              <IoHeartOutline
                fontSize={"20px"}
                onClick={likePost}
                className="like-icon"
              />
            )}
            <p>{likes} likes</p>
          </div>
        </PictureLikes>
        {username === userName ? (
          <Trash
            fontSize={"20px"}
            className="trash"
            onClick={() => {
              openModal();
            }}
          />
        ) : (
          <></>
        )}

        <PostInfo>
          <div className="username">{username}</div>
          <div className="description">
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(e) => {
                const hashtagWithoutHash = e.replace("#", "");
                navigate(`/hashtag/${hashtagWithoutHash}`);
              }}
            >
              {description}
            </ReactTagify>
          </div>
          <div className="link" onClick={() => routeChange(link.url)}>
            <div className="url-metadata-info">
              <div className="link-title">{link.title}</div>
              <div className="link-description">{link.description}</div>

              <div className="link-url">{link.url}</div>
            </div>

            <div className="url-metadata-image">
              <img
                src={link.image === "" ? linkr : link.image}
                alt="Pré-visualização do link"
              />
            </div>
          </div>
        </PostInfo>
      </PostStyled>
    </>
  );
}
