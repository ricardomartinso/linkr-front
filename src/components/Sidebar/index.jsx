import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getHashtags from "../../data/getHashtags";

export default function Sidebar() {
  const navigate = useNavigate();
  const [hashtags, setHashtags] = useState([]);
  const [swap, setSwap] = useState(true);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);

  async function pullHashtags() {
    const { resp: response, status } = await getHashtags();
    if (status) {
      if (response.data.length === 0) {
        setAlert(true);
      } else {
        setHashtags(response.data);
      }
      setSwap(false);
    } else {
      setAlert(true);
      setText("There are not hashtags yet");
    }
  }

  useEffect(() => {
    pullHashtags();
  }, []);
  return (
    <SidebarStyled>
      <h2>trending</h2>
      <div className="border-sidebar"></div>
      <div>
        <div className="hashtags">
          {alert ? (
            <Text>{text}</Text>
          ) : (
            <div>
              {hashtags.map((item, index) => {
                const spacedHashtag = item.hashtag;
                return (
                  <p
                    key={index}
                    className="hashtag"
                    onClick={() => {
                      navigate(
                        `/hashtag/${spacedHashtag.substr(
                          1,
                          spacedHashtag.length - 1
                        )}`
                      );
                    }}
                  >
                    {spacedHashtag}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </SidebarStyled>
  );
}

const Text = styled.div`
  font-size: 15px;
  padding-top: 20px;
  color: #ffffff;
`;
const SidebarStyled = styled.div`
  display: flex;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 301px;
    height: 440px;
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
