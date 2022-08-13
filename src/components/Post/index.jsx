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


export default function Post({ postId, picture, description, link, username, likes, pullPosts }) {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const tagStyle = {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  function likePost() {
    const API_URL = getApiUrl(`post/like/${postId}`);
    const config = getConfig(token);
    const promise = axios.post(API_URL, {},config);
    promise.then(()=>{
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
    promise.then(()=>{
      setIsLiked(false);
      pullPosts();
    });
    promise.catch((error) => {
      console.log(error);
    });
  }

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
        <div className="link">
          <div className="url-metadata-info">
            <div className="link-title">
              {link.title}
            </div>
            <div className="link-description">
              {link.description}
            </div>
            <div className="link-url">{link.url}</div>
          </div>
          <div className="url-metadata-image">
            <img
              src={link.image}
              alt="Pré-visualização do link"
            />
          </div>
        </div>
      </PostInfo>
    </PostStyled>
  );
}