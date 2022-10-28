import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Container, Title, Button, Text, View } from "../../styleglobal";
import api from "../../services/api";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../components/Toast";
export default function Create() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [validate, setValidate] = useState("");
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
      multiplier,
      validate,
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
          toastSuccess("Usuário criado com sucesso")
        }).then(() => setTimeout(() => BackHome(), 2000))
        .catch(() => toastError("Erro ao criar usuário"))
    } catch (error) {
      toastError("Erro ao criar usuário")
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
      <View>
        <Button onClick={BackHome}>Voltar</Button>
        <Button onClick={SaveData}>Salvar</Button>
      </View>
    </Container>
  );
}
