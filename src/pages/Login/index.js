import React, { useState, useContext } from "react";
import api from "../../services/api";
import AuthContext from "../../context/auth";
import { login } from "../../services/auth";
import { ToastContainer } from 'react-toastify'
import { toastError } from "../../components/Toast";
import { Input, Container, Title, Button, Text } from "../../styleglobal";
import { useRef } from "react";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const passRef = useRef()
  const emailRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      api.post("/login",
        {
          email: emailRef.current.value,
          password: passRef.current.value
        }).then((result) => {
          signIn(result.data.token);
          login(result.data.token);
        }).catch(() => {
          toastError('E-mail ou senha inválida')
        })
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <ToastContainer />
      <Title>Login</Title>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
        <Text>E-mail</Text>
        <Input
          placeholder="Insira o e-mail"
          type="email"
          ref={emailRef}
        />
        <Text>Senha</Text>
        <Input
          placeholder="Insira a senha"
          type="password"
          ref={passRef}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Container>
  );
}
