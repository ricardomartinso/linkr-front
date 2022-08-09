import styled from "styled-components";
import { useContext } from "react";
import LoginContext from "../../contexts/LoginContext";

export default function FormLogin() {
  const { form, setForm, swap } = useContext(LoginContext);

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <DivForm>
      <DivInput>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleForm}
          value={form.email}
          disabled={swap}
          // autoComplete='off'
        />
      </DivInput>
      <DivInput>
        <Input
          placeholder="Senha"
          type="password"
          name="password"
          onChange={handleForm}
          value={form.password}
          disabled={swap}
          autoComplete="off"
        />
      </DivInput>
    </DivForm>
  );
}

const DivForm = styled.div`
  margin: 36px 0px 16px 0px;
`;

const DivInput = styled.div`
  margin-top: 10px;
  font-weight: 400;
  width: 100%;
`;

const Input = styled.input`
  color: #666666;
  font-size: 18px;
  width: 350px;
  height: 58px;
  padding-left: 15px;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;

  ::-webkit-input-placeholder {
    color: #000000;
    font-size: 20px;
    font-weight: 400;
  }

  :disabled {
    color: #afafaf;
    background-color: #f2f2f2;
    font-size: 20px;
    font-weight: 400;
  }
`;
