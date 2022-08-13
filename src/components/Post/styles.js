import styled from "styled-components";

const PostStyled = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 250px;
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

  .like-icon:hover {
    cursor: pointer;
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

export {
  PostStyled,
  PictureLikes,
  PostInfo,
  ModalTitle,
  ButtonsDiv,
  ErrorMessage,
};
