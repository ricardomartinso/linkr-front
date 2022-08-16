import styled from "styled-components";
import { IoReload } from "react-icons/io5";

export default function ReloadPosts({ newPosts }) {
  return (
    <Button>
      {newPosts} new posts, load more! <ReloadStyled />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 61px;
  border-radius: 16px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: white;
  background: #1877f2;

  font-size: 16px;
  font-family: "Lato";
  font-weight: 400;

  margin: 20px 0 10px 0;
`;
const ReloadStyled = styled(IoReload)`
  margin-left: 15px;
  font-weight: bold;
  font-size: 18px;
`;
