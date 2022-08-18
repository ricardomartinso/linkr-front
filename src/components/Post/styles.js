import styled from "styled-components";
import Modal from "react-modal";
import { IoMdPaperPlane } from "react-icons/io";

const PostStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background: #1e1e1e;
  border-radius: 10px;
  color: white;
  font-family: "Lato";
  margin-bottom: 20px;

  .post-information {
    display: flex;
    border-radius: 10px;
    background-color: black;

    .trash {
      position: absolute;
      right: 20px;
      top: 15px;
      cursor: pointer;
    }
    .redact {
      position: absolute;
      right: 60px;
      top: 15px;
      color: white;
      cursor: pointer;
    }
  }

  @media (min-width: 800px) {
    .post-information {
      height: 276px;
    }
  }
`;
const PictureLikes = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20%;
  font-size: 0.8125rem;

  .picture {
    margin-top: 14px;
    margin-bottom: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
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

  .like-icon:hover {
    cursor: pointer;
  }
  .comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 10px;

    p {
      margin-top: 4px;
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
  height: 250px;

  .username {
    font-size: 17px;
    margin-top: 15px;
  }
  .description {
    font-size: 15px;
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
    height: 166px;
    border-radius: 10px;

    .url-metadata-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2% 2% 2% 4%;
      width: 68%;
      border-right: 1px solid #ffffff49;

      .link-title {
        font-size: 16px;
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
        width: 90%;
        margin-top: 10px;
        height: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        color: #cecece;
        height: 16px;
      }

      @media (max-width: 390px) {
        .link-url {
          width: 135px;
        }
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
    width: 562px;
    height: 276px;
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

  @media (max-width: 800px) {
    font-size: 29px;
  }
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
    font-size: 16px;

    @media (max-width: 500px) {
      width: 35%;
      font-size: 13px;
    }
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
    font-size: 16px;
    @media (max-width: 500px) {
      width: 35%;
      font-size: 13px;
    }
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
const ModalStyle = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: #333333;
  width: 94%;
  border-radius: 30px;
  height: 262px;

  @media (min-width: 800px) {
    width: 600px;
    border-radius: 50px;
  }
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  background: #1e1e1e;
  color: white;
  font-family: "Lato";
`;

const WriteComment = styled.div`
  display: flex;
  align-items: center;
  width: 90%;

  margin: 1rem 0;
  position: relative;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1.25rem;
    object-fit: cover;
  }
  input {
    width: 88%;
    height: 2.44rem;
    border: none;
    background-color: #252525;
    border-radius: 8px;
    padding-left: 1rem;
    color: white;
    font-size: 0.92rem;
  }
`;
const PaperPlane = styled(IoMdPaperPlane)`
  position: absolute;
  font-size: 20px;
  right: 25px;
  bottom: 10px;
`;
export {
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
};
