import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from '../../components/Toast'
import {
  Button,
  MicroButton,
  Text,
  Div,
  List,
} from "../../styleglobal";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [updateUser, setUpdateUser] = useState(false)
  const history = useNavigate();
  const { changeUser } = useContext(AuthContext);

  useEffect(() => {
    try {
      api.get("/user").then((result) => {
        setCustomers(result.data);
      });
      setUpdateUser(false)
    } catch (err) {
      console.log(err);
    }
  }, [updateUser]);

  function CreateUser() {
    history("/create");
  }
  function CreateBot() {
    history("/createa");
  }
  function ChangeUser(e) {
    changeUser(e);
    history("/change");
  }
  function UserBot(e) {
    changeUser(e);
    history("/userbot");
  }

  function DeleteUser(account) {
    try {
      api.delete(`/user/${account}`).then(result => {
        toastSuccess("Usuário deletado com sucesso")
        setUpdateUser(true)
      }).catch(() => toastError("Erro ao deletar usuário"))
    } catch (error) {
      toastError("Erro ao deletar usuário")
    }
  }
  function EncerrarOrdens() {
    const data = {
      "ticket": 0,
      "symbol": "CLOSEALL",
      "price": 0,
      "takeProfit": 0,
      "stopLoss": 0,
      "operationType": 99,
      "orderType": 99,
      "percentage": 99,
      "status_order": "CLOSEALL"
    }
    try {
      api.post(`/order/`, data).then(result => {
        toastSuccess("Comando enviado com sucesso")
      }).catch(() => toastError("Falha ao enviar o comando"))
    } catch (error) {
      toastError("Falha ao enviar o comando")
    }
  }
  return (
    <div>
      <ToastContainer />
      <Button onClick={CreateBot}>Criar bot</Button>
      <Button onClick={CreateUser}>Criar usuário</Button>
      <Button delete onClick={EncerrarOrdens}>Encerrar ordens</Button>
      {customers &&
        customers.map((customer, index) => (
          <List style={{ borderTop: '1px solid black', paddingBottom: '8px' }} key={index}>
            <Div>
              <Text>
                {customer.name}
                <br />
                {customer.email}
              </Text>
            </Div>
            <Div>
              <Text>
                {customer.phone}
                <br />
                Telefone
              </Text>
            </Div>
            <Div>
              <Text>
                {customer.account}
                <br />
                Conta corretora
              </Text>
            </Div>
            <Div>
              <Text>
                {customer.multiplier}
                <br />
                Multiplicador
              </Text>
            </Div>
            <Div>
              <Text>
                {customer.validate}
                <br />
                Validade
              </Text>
            </Div>
            <Div buttons>
              <MicroButton
                onClick={() => {
                  ChangeUser(customer.id);
                }}
              >
                Alterar
              </MicroButton>
              <MicroButton
                onClick={() => {
                  UserBot(customer.id);
                }}
              >
                Bot
              </MicroButton>
              <MicroButton delete
                onClick={() => {
                  DeleteUser(customer.id);
                }}
              >
                Deletar
              </MicroButton>
            </Div>
          </List>
        ))}
    </div>
  );
}
