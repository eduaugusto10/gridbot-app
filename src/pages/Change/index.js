import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import AuthContext from "../../context/auth";
import { Input, Container, Title, Button, Text, View } from "../../styleglobal";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../components/Toast";
import messages from "../../components/Toast/messages.json"
export default function Change() {
  const history = useNavigate();
  const { userID } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [broker, setBroker] = useState("");

  useEffect(() => {
    try {
      api.get(`/user/${userID}`).then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAccount(result.data.account);
        setBroker(result.data.broker);
        setPhone(result.data.phone)
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function BackHome() {
    history("/home");
  }

  function SaveData() {
    const data = {
      name,
      email,
      account,
      broker,
      phone
    }
    try {
      api.put(`/user/${userID}`, data).then((result) => {
        toastSuccess(messages.successChangeUser)
      }).then(() => setTimeout(() => BackHome(), 2000))
    } catch (error) {
      toastError(messages.errorChangeUser)
    }
  }

  return (
    <Container>
      <ToastContainer />
      <Title>Alterar usuário</Title>
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
