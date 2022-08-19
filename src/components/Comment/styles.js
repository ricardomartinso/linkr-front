import styled from "styled-components";

const CommentStyled = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border-bottom: 0.0625rem solid #353535;
  height: 4.375rem;
  .comment-picture {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    margin-right: 1.25rem;
  }
  .comment-info {
    .comment-user {
      display: flex;
      align-items: center;
      margin-bottom: 0.375rem;
      p {
        font-size: 1rem;
        color: white;
        font-weight: 700;
      }
      span {
        font-size: 1rem;
        font-weight: 400;
        color: #565656;
        margin-left: 7px;
      }
    }
    .comment-text {
      font-size: 0.875rem;
      font-weight: 400;
      color: #acacac;
    }
  }
`;

export { CommentStyled };
