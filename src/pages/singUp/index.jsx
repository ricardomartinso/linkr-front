import styled from "styled-components";
import { useState, useContext } from "react";
import FormSignUp from "../../components/FormSignUp";
import { Link } from "react-router-dom";

import singUp from "../../data/signup.jsx";
import LoginContext from "../../contexts/LoginContext";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [swap, setSwap] = useState(false);//desabilitar input e botoes
  const [alert, setAlert] = useState(true); // mostra popup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword:"",
    username:"",
    picture:""
  });
  
  const navigate = useNavigate();

  async function userCreate() {
    setSwap(true);
    const { result: resp, status: status } = await singUp(form);
    
    if (status) {
      setForm({
        email: "",
        password: "",
        confirmPassword:"",
        username:"",
        picture:""
      });
      setAlert(true);
      setTimeout(() => {
        setSwap(false);
        navigate("/");
      }, 500);
    } else {
      if (typeof resp.data === 'string') {
        setError([resp.data])
      } else {
        setError(resp.data)
      }
      setTimeout(() => {
        setSwap(false);
        setAlert(false);
      }, 500);

    }
  }

  function updateError(item) {
    const newList = error.filter((elem) => elem !== item)
    setError(newList)
  }

  return (
    <LoginContext.Provider
      value={{ form, setForm, swap, setSwap, loading, setLoading }}
    >
      <DivGlobal>
        <DivLeft>
          <Logo>
            linkr
          </Logo>
          <Text>
            save, share and discover
            the best links on the web
          </Text>
        </DivLeft>

        <DivLogin>

          <FormSignUp />

          <Button onClick={userCreate} disabled={swap}>
            {swap ? (
              <ThreeDots color="#ffffff" height={40} width={80} />
            ) : (
              "Sign Up"
            )}
          </Button>

          {error?.length === 0 ? null :
            error?.map((item, index) => (
              <ErrorMessage key={index}>
                <h3>{item}</h3>
                <h4 onClick={() => updateError(item)}>X</h4>
              </ErrorMessage>
            ))}

          <MyLink to="/">
            <TextRegister>Switch back to log in</TextRegister>
          </MyLink>
        </DivLogin>
      </DivGlobal>
    </LoginContext.Provider>
  );
}

const Logo = styled.h2`
  font-family: "Passion One";
  font-size: 106px;
  font-style: normal;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: .5rem;
  @media (max-width: 1100px) {
    font-size: 76px;
  }
`;

const Text = styled.p`
  font-family: 'Oswald';
  font-style: normal;
  line-height: 50px;
  width:500px;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  @media (max-width: 1100px) {
    font-size: 23px;
    width: 237px;
    line-height: 34px;
  }
`;

const ErrorMessage = styled.div`
 font-family: 'Lato';
  width: 429px;
  height: 45px;
  background-color: #FF3642;
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
  border-radius: 5px;
  margin-bottom: -1em;

  h4 {
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);

    &:hover {
      cursor: pointer;
    }
  }

  h3 {
    color: rgba(255, 255, 255, 1);
    font-size: 13px;
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    width: 330px;
    height: 45px;
  }
`;

const MyLink = styled(Link)`
  margin-top: 50px;
  text-decoration: none;
`;

const DivLeft = styled.div`
  width: 60%;
  height: 100vh;
  padding-left: 6%;
  display: flex;
  padding-top: 16%;
  background-color:#151515;
  flex-direction: column;
  align-items: left;
  @media (max-width: 1100px) {
    width: 100%;
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0px;
  }
`;

const DivGlobal = styled.div`
  width: 100%;
  height: 100vh;
  @media (min-width: 1100px) {
    display:flex;
  }
`;

const DivLogin = styled.div`
  width: 40%;
  height: 94vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1100px) {
    width: 100%;
    height:auto;
    margin-top: 20px;
  }
`;


const TextRegister = styled.h2`
  text-align: center;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  color: #ffffff;
  font-size: 22px;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 3px;
  line-height: 1.5;
  @media (max-width: 1100px) {
    font-size: 17px;
  }
`;

const Button = styled.button`
  width: 429px;
  height: 65px;
  font-family:'Oswald';
  color: #ffffff;
  font-size: 27px;
  font-weight: 400;
  background: #1877F2;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;

  border: 1px solid #1877F2;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  @media (max-width: 1100px) {
    width: 330px;
    height: 55px;
    font-size: 22px;
  }

  :hover {
    filter: brightness(1.1);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  }
`;
