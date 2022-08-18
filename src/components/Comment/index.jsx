import { CommentStyled } from "./styles";

export default function Comment({
  commentPicture,
  username,
  commentText,
  userComment,
}) {
  return (
    <CommentStyled>
      <div className="comment-picture">
        <img src={commentPicture} alt="image" />
      </div>
      <div className="comment-info">
        <div className="comment-user">
          <p> {username} </p>
          <span>{userComment !== "" ? `• ${userComment}` : ""}</span>
        </div>
        <div className="comment-text">{commentText}</div>
      </div>
    </CommentStyled>
  );
}
