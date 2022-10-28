import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import AuthContext from "../../context/auth";
import { Input, Container, Title, Button, Text, View } from "../../styleglobal";

export default function Change() {
  const history = useNavigate();
  const { userID } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [validate, setValidate] = useState("");

  useEffect(() => {
    try {
      api.get(`/user/${userID}`).then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAccount(result.data.account);
        setValidate(result.data.validate);
        setMultiplier(result.data.multiplier);
        setPhone(result.data.phone)
      });
    } catch (error) {
      console.log(error);
    }
  },[] );

  function BackHome() {
    history("/home");
  }

  function SaveData() {
    const data = {
    name,
    email,
    account,
    validate,
    multiplier,
    phone    
    }
    try {
      api.put(`/user/${userID}`, data).then((result) => {
        BackHome();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
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
      <Text>Conta da corretora</Text>
      <Input
        type="number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Text>Validade</Text>
      <Input
        type="date"
        value={validate}
        onChange={(e) => setValidate(e.target.value)}
      />
      <Text>Multiplicador de lote</Text>
      <Input
        type="number"
        value={multiplier}
        onChange={(e) => setMultiplier(e.target.value)}
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
