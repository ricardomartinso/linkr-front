import { IoHeart, IoPaperPlane } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useContext, useEffect, useCallback, useState } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash as Trash } from "react-icons/io";
import { IoMdPaperPlane } from "react-icons/io";
import { VscEdit as Redact } from "react-icons/vsc";
import Comment from "../Comment";
import {
  PostStyled,
  PictureLikes,
  PostInfo,
  ModalTitle,
  ButtonsDiv,
  ErrorMessage,
  ModalStyle,
  Comments,
  WriteComment,
  PaperPlane,
} from "./styles";
import axios from "axios";
import { getApiUrl, getConfig } from "../../utils/apiUtils";
import UserContext from "../../contexts/UserContext";
import linkr from "../../assets/images/linkr.png";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { AiOutlineComment } from "react-icons/ai";

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
  userLiked,
  username,
  likes,
  latestLikes,
  postId,
  pullPosts,
  userId,
}) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { userName, token } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(true);
  const [editDescription, setEditDescription] = useState(description);
  const [viewDescription, setViewDescription] = useState(description);
  const [isAble, setIsAble] = useState(true);
  const [openComment, setOpenComment] = useState(false);
  const tagStyle = {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  useEffect(() => {
    if (userLiked && !isLiked) {
      if (postId === 129) {
        console.log("userLiked");
        console.log(userLiked);
        console.log("Entrou no if");
      }
      setIsLiked(true);
    }
  }, [userLiked]);

  const callbackRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

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

  async function updatePost() {
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { resp: response, status } = await axios.put(
        `http://linkr-backend-30.herokuapp.com/post/${postId}`,
        { description: editDescription },
        auth
      );

      return status;
    } catch (error) {
      return error.response.status;
    }
  }
  function editText() {
    setEditDescription(viewDescription);
    setIsEditDescription(!isEditDescription);
  }

  async function closeTextArea(e) {
    if (e.keyCode === 27) {
      setEditDescription(viewDescription);
      setIsEditDescription(true);
    } else if (e.keyCode === 13) {
      setIsAble(false);
      if ((await updatePost()) === 200) {
        setViewDescription(editDescription);
        setIsAble(true);
        setIsEditDescription(true);
      } else {
        alert("falha ao atualizar descrição");
        setIsAble(true);
      }
    }
  }

  function focusEnd(e) {
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
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

  function renderLikesCount() {
    if (latestLikes) {
      const users =
        latestLikes.length === 2
          ? `${[latestLikes]}`.replace(",", " e ")
          : `${[latestLikes.slice(0, 2)]}`.replace(",", ", ");
      const latestUsersLikes = users.includes(userName)
        ? users.replace(userName, "você")
        : users;
      let otherUsers =
        latestLikes.length > 2 ? `e outras ${likes - 2} pessoas` : "";
      if (likes === 3) {
        otherUsers = "e mais 1 pessoa";
      }

      return (
        <p
          data-tip={`${latestUsersLikes} ${otherUsers}`}
          data-place="bottom"
          data-type="light"
          data-effect="solid"
        >
          {likes} {likes === 1 ? "like" : "likes"}
        </p>
      );
    } else {
      return (
        <p
          data-tip=""
          data-place="bottom"
          data-type="light"
          data-effect="solid"
        >
          {likes} {likes === 1 ? "like" : "likes"}
        </p>
      );
    }
  }

  const routeChange = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {isLoading ? (
        <Modal
          isOpen={modalIsOpen}
          overlayClassName="modal"
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ModalTitle>Carregando. . .</ModalTitle>
        </Modal>
      ) : (
        <ModalStyle
          isOpen={modalIsOpen}
          className="modal-responsive"
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
        </ModalStyle>
      )}
      {hasError ? (
        <ErrorMessage>
          An error has ocurred on deleting your post! Try again.
        </ErrorMessage>
      ) : (
        <></>
      )}

      <PostStyled>
        <div className="post-information">
          <PictureLikes>
            <div className="picture">
              <img
                src={picture}
                alt="IMG"
                onClick={() => {
                  navigate(`/user/${username}`);
                }}
              />
            </div>
            <div className="likes">
              {isLiked ? (
                <IoHeart
                  fontSize={"24px"}
                  color={"red"}
                  onClick={unlikePost}
                  className="like-icon"
                />
              ) : (
                <IoHeartOutline
                  fontSize={"24px"}
                  onClick={likePost}
                  className="like-icon"
                />
              )}
              {renderLikesCount()}
              <ReactTooltip />
            </div>
            <div
              className="comments"
              onClick={() => {
                if (!openComment) {
                  setOpenComment(true);
                } else {
                  setOpenComment(false);
                }
              }}
            >
              <AiOutlineComment fontSize={"24px"} /> <p>3 comments</p>
            </div>
          </PictureLikes>
          {username === userName ? (
            <>
              <Redact
                fontSize={"20px"}
                className="redact"
                onClick={() => {
                  editText();
                }}
              />

              <Trash
                fontSize={"20px"}
                className="trash"
                onClick={() => {
                  openModal();
                }}
              />
            </>
          ) : (
            <></>
          )}

          <PostInfo>
            <div
              className="username"
              onClick={() => {
                navigate(`/user/${userId}`);
              }}
            >
              {username}
            </div>

            {isEditDescription ? (
              <div className="description">
                <ReactTagify
                  tagStyle={tagStyle}
                  tagClicked={(e) => {
                    const hashtagWithoutHash = e.replace("#", "");
                    navigate(`/hashtag/${hashtagWithoutHash}`);
                  }}
                >
                  {viewDescription}
                </ReactTagify>
              </div>
            ) : isAble ? (
              <textarea
                onFocus={(e) => focusEnd(e)}
                onKeyDown={(e) => closeTextArea(e)}
                ref={callbackRef}
                className="description"
                onChange={(e) => {
                  setEditDescription(e.target.value);
                }}
                value={editDescription}
              >
                <ReactTagify
                  tagStyle={tagStyle}
                  tagClicked={(e) => {
                    const hashtagWithoutHash = e.replace("#", "");
                    navigate(`/hashtag/${hashtagWithoutHash}`);
                  }}
                ></ReactTagify>
              </textarea>
            ) : (
              <textarea
                disabled
                onFocus={(e) => focusEnd(e)}
                onKeyDown={(e) => closeTextArea(e)}
                ref={callbackRef}
                className="description"
                onChange={(e) => {
                  setEditDescription(e.target.value);
                }}
                value={editDescription}
              >
                <ReactTagify
                  tagStyle={tagStyle}
                  tagClicked={(e) => {
                    const hashtagWithoutHash = e.replace("#", "");
                    navigate(`/hashtag/${hashtagWithoutHash}`);
                  }}
                ></ReactTagify>
              </textarea>
            )}

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
        </div>
        {openComment ? (
          <Comments>
            <Comment
              username={"João avatares"}
              commentText={
                "Adorei esse post, ajuda muito a usar Material UI com React!"
              }
              commentPicture={
                "https://www.comboinfinito.com.br/principal/wp-content/uploads/2022/05/mob-psycho-100.jpg"
              }
              userComment={"post's author"}
            />
            <WriteComment>
              <img
                src="https://www.comboinfinito.com.br/principal/wp-content/uploads/2022/05/mob-psycho-100.jpg"
                alt=""
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="write a comment..."
              />
              <div>
                <PaperPlane />
              </div>
            </WriteComment>
          </Comments>
        ) : (
          <></>
        )}
      </PostStyled>
    </>
  );
}
