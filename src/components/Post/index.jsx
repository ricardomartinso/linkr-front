import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash as Trash } from "react-icons/io";
import { PictureLikes, PostInfo, PostStyled } from "./styles";
import axios from "axios";
import { getApiUrl, getConfig } from "../../utils/apiUtils";
import UserContext from "../../contexts/UserContext";
import linkr from "../../assets/images/linkr.png"
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
  pullPosts
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
        `http://localhost:5020/posts/${postId}`,
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
    window.open(url, '_blank');
  }

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
      <Trash fontSize={"20px"} className="trash" />
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
            <div className="link-title">
              {link.title}

            </div>
            <div className="url-metadata-image">
              <img src={link.image} alt="" />
            </div>

            <div className="link-url">{link.url}</div>
          </div>
          <div className="url-metadata-image">
            <img
              src={link.image === '' ? linkr : link.image}
              alt="Pré-visualização do link"
            />

          </div>
        </PostInfo>
      </PostStyled>
    </>
  );
}

const PostStyled = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 232px;
  background-color: black;
  color: white;
  margin-bottom: 18px;
  font-family: "Lato";

  .trash {
    position: absolute;
    right: 20px;
    top: 15px;
  }

  @media (min-width: 800px) {
    height: 276px;
    border-radius: 10px;
  }
`;
const PictureLikes = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20%;

  .picture {
    margin-top: 14px;
    margin-bottom: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .likes {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      margin-top: 20px;
    }
  }
  @media (min-width: 800px) {
    .picture {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .likes {
      p {
        margin-top: 5px;
      }
    }
    font-size: 15px;
  }
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  .username {
    font-size: 17px;
    margin-top: 15px;
  }
  .description {
    font-size: 17px;
    width: 95%;
    word-break: normal;
    margin-top: 10px;
    color: #b7b7b7;
  }
  .link {
    display: flex;
    border: 1px solid #ffffff49;
    margin-top: 10px;
    width: 95%;
    height: 66%;
    border-radius: 10px;

    .url-metadata-info {
      display: flex;
      flex-direction: column;
      padding: 2% 2% 2% 4%;
      width: 68%;
      border-right: 1px solid #ffffff49;

      .link-title {
        font-size: 18px;
        color: #cecece;
        margin-bottom: 10px;
      }
      .link-description {
        font-size: 13px;
        max-height: 52.5px;
        margin-top: 14px;
        color: #9b9595;
        margin-bottom: 10px;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        word-wrap: normal;
      }
      .link-url {
        max-width: 90%;
        margin-top: 10px;
        height: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        color: #cecece;
        height: 16px;
      }
    }

    .url-metadata-image {
      width: 32%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0px 10px 10px 0px;
        object-fit: cover;
      }
    }
  }

  @media (min-width: 800px) {
    font-size: 20px;

    .link {
      border: 1px solid #ffffff49;
      border-radius: 10px;
      height: 62%;
    }
  }
`;
const ModalTitle = styled.h2`
  font-size: 34px;
  color: white;
  font-family: "Lato";
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  width: 80%;
`;
const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 37px;
  font-size: 18px;

  .no-button {
    width: 137px;
    height: 37px;
    background-color: #fff;
    border-radius: 5px;
    border: none;
    margin-right: 20px;
    color: #1877f2;
    font-family: "Lato";
    font-weight: 700;
  }
  .yes-button {
    width: 137px;
    height: 37px;
    background-color: #fff;
    border-radius: 5px;
    border: none;
    background: #1877f2;
    color: #fff;
    font-family: "Lato";
    font-weight: 700;
  }
`;
const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 22px 0;
  width: 100%;
  height: 2.5rem;
  color: #fff;
  background-color: #941a1a;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  text-align: center;
  padding: 5px;
`;


