import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import styled from "styled-components";
import { useState, useContext } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash as Trash } from "react-icons/io";
import UserContext from "../../contexts/UserContext";

export default function Post({
  picture,
  description,
  link,
  username,
  likes,
  postId,
}) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { userName } = useContext(UserContext);

  const tagStyle = {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
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
              onClick={() => {
                setIsLiked(false);
              }}
            />
          ) : (
            <IoHeartOutline
              fontSize={"20px"}
              onClick={() => {
                setIsLiked(true);
              }}
            />
          )}
          <p>{likes} likes</p>
        </div>
      </PictureLikes>
      {userName === username ? (
        <Trash
          fontSize={"20px"}
          className="trash"
          onClick={() => {
            console.log(postId);
          }}
        />
      ) : (
        ""
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
        <div className="link">
          <div className="url-metadata-info">
            <div className="link-title">{link.title}</div>
            <div className="link-description">{link.description}</div>
            <div className="link-url">{link.url}</div>
          </div>
          <div className="url-metadata-image">
            <img src={link.image} alt="" />
          </div>
        </div>
      </PostInfo>
    </PostStyled>
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
      padding: 5%;
      width: 68%;
      border-right: 1px solid #ffffff49;

      .link-title {
        font-size: 18px;
        color: #cecece;
        margin-bottom: 10px;
      }
      .link-description {
        font-size: 13px;
        color: #9b9595;
        margin-bottom: 10px;
      }
      .link-url {
        font-size: 13px;
        color: #cecece;
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
