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
          placeholder="e-mail"
          name="email"
          onChange={handleForm}
          value={form.email}
          disabled={swap}
        // autoComplete='off'
        />
      </DivInput>
      <DivInput>
        <Input
          placeholder="password"
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
  margin-bottom: 18px;
  margin-top: -4em;
  @media (max-width: 1100px) {
    margin-top:20px;
  }
`;

const DivInput = styled.div`
  margin-top: 15px;
  font-weight: 400;
  width: 100%;
`;

const Input = styled.input`
  color: #151515;
  font-size: 18px;
  width: 429px;
  height: 65px;
  padding-left: 15px;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  font-weight: 700;
  font-size: 27px;
  @media (max-width: 1100px) {
    width: 330px;
    height: 55px;
    font-size: 23px;
  }

  ::-webkit-input-placeholder {
    color: #9F9F9F;
  }

  :disabled {
    color: #afafaf;
    background-color: #f2f2f2;
  }
`;
