import styled from "styled-components";
import { useState } from "react";
import FormLogin from "../../components/FormLogin";
import { Link } from "react-router-dom";
import login from "../../data/login.jsx";
import LoginContext from "../../contexts/LoginContext";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [swap, setSwap] = useState(false);
  const [alert, setAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function userLogin() {
    setSwap(true);
    const resp = await login(form);
    if (resp.status) {
      setForm({
        email: "",
        password: "",
      });
      setAlert(true);
      const response = resp.response;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);
      setToken(response.data.token);
      setUserName(response.data.name);
      setTimeout(() => {
        setSwap(false);
        navigate("/records");
      }, 500);
    } else {
      setTimeout(() => {
        setSwap(false);
        setAlert(false);
      }, 500);
    }
  }

  return (
    <LoginContext.Provider
      value={{ form, setForm, swap, setSwap, loading, setLoading }}
    >
      <DivLogin>
        <Title>My Wallet</Title>

        <FormLogin />

        <Button onClick={userLogin} disabled={swap}>
          {swap ? (
            <ThreeDots color="#ffffff" height={40} width={80} />
          ) : (
            "Entrar"
          )}
        </Button>
        {alert ? null : (
          <TextAlert>
            Por favor, verifique as suas informações e tente novamente.
          </TextAlert>
        )}

        <MyLink to="/register">
          <TextRegister>Primeira vez? Cadastre-se!</TextRegister>
        </MyLink>
      </DivLogin>
    </LoginContext.Provider>
  );
}

const Title = styled.h1`
  font-family: "Saira Stencil One";
  font-size: 32px;
  color: #ffffff;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  margin-top: 50px;
`;

const DivLogin = styled.div`
  width: 100%;
  height: 94vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextAlert = styled.h2`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
`;

const TextRegister = styled.h2`
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
`;
const Button = styled.button`
  width: 350px;
  height: 46px;

  color: #ffffff;
  font-size: 21px;
  font-weight: 400;
  background: #a328d6;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;

  border: 1px solid #a328d6;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  :hover {
    filter: brightness(1.1);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  }
`;
