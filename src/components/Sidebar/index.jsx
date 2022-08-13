import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const hashtags = [
    "#react",
    "#google",
    "#google",
    "#google",
    "#google",
    "#google",
    "#teste",
    "#javascript",
    "#dota2",
  ];
  return (
    <SidebarStyled>
      <h2>trending</h2>
      <div className="border-sidebar"></div>
      <div>
        <div className="hashtags">
          {hashtags.map((hashtag, index) => {
            const spacedHashtag = hashtag.replace("#", "");
            return (
              <p
                key={index}
                className="hashtag"
                onClick={() => {
                  navigate(`/hashtag/${spacedHashtag}`);
                }}
              >
                # {spacedHashtag}
              </p>
            );
          })}
        </div>
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.div`
  display: none;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 301px;
    height: 406px;
    background-color: black;
    border-radius: 25px;
    margin-left: 20px;
    font-family: "Oswald";
    font-weight: 700;

    h2 {
      margin-top: 25px;
      margin-left: 25px;
      margin-bottom: 10px;
      font-size: 25px;
      color: white;
    }
    .hashtags {
      margin-top: 20px;
      margin-left: 25px;
    }
    .hashtag {
      font-size: 18px;
      font-family: "Lato";
      color: white;
      margin: 15px 0;
      :hover {
        cursor: pointer;
      }
    }
    .border-sidebar {
      width: 100%;
      height: 1px;
      background-color: #484848;
      margin-top: 7px;
    }
  }
`;
