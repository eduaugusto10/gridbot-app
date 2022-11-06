import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Container, Title, Button, Text, View } from "../../styleglobal";
import api from "../../services/api";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../components/Toast";
import messages from '../../components/Toast/messages.json'
export default function Create() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [broker, setBroker] = useState("");
  const [administrator, setAdministrator] = useState()
  function BackHome() {
    history("/home");
  }

  function SaveData() {
    const data = {
      name,
      email,
      password,
      account,
      phone,
      broker,
      administrator
    }
    try {
      api
        .post("/user", data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((result) => {
          toastSuccess(messages.successCreateUser)
        }).then(() => setTimeout(() => BackHome(), 2000))
        .catch(() => toastError(messages.errorCreateUser))
    } catch (error) {
      toastError(messages.errorCreateUser)
    }
  }

  return (
    <Container>
      <ToastContainer />
      <Title>Criar usuário</Title>
      <Text>Nome</Text>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Text>E-mail</Text>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Text>Corretora</Text>
      <Input
        type="text"
        value={broker}
        onChange={(e) => setBroker(e.target.value)}
      />
      <Text>Conta da corretora</Text>
      <Input
        type="number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Text>Senha</Text>
      <Input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Text>Telefone</Text>
      <Input
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <View>
        <Button onClick={BackHome}>Voltar</Button>
        <Button onClick={SaveData}>Salvar</Button>
      </View>
    </Container>
  );
}
