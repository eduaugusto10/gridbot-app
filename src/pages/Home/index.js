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
  Input,
} from "../../styleglobal";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([])
  const [updateUser, setUpdateUser] = useState(false)
  const [magicNumber, setNewMagicNumber] = useState()
  const history = useNavigate();
  const { changeUser } = useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        api.get("/user").then((result) => {
          setCustomers(result.data.users);
          setOrders(result.data.ordersSlave);
        });
      } catch (err) {
        console.log(err);
      }
    }, 5000)
    return () => clearInterval(intervalId);
  }, [updateUser]);

  useEffect(() => {
    try {
      api.get("/user").then((result) => {
        setCustomers(result.data.users);
        setOrders(result.data.ordersSlave);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
  const StatusOrder = (id) => {
    let status = "OK"
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].slaveOrders === id && orders[i].status === "NOK")
        return orders[i].magicNumber
    }
    return status
  }
  function DeleteUser(account) {
    try {
      api.delete(`/user/${account}`).then(result => {
        toastSuccess("Usuário deletado com sucesso")
        setUpdateUser(prevUpdateUser => !prevUpdateUser)
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
  function EncerrarMagicNumberOrdens() {

    const data = {
      "ticket": 0,
      "symbol": "CLOSEMAGICNUMBER",
      "price": 0,
      "takeProfit": 0,
      "stopLoss": 0,
      "operationType": 89,
      "orderType": 89,
      "percentage": 99,
      "magicNumber": magicNumber,
      "status_order": "CLOSEMAGICNUMBER"
    }
    if (magicNumber !== undefined) {
      try {
        api.post(`/order/`, data).then(result => {
          toastSuccess("Comando enviado com sucesso")
        }).catch(() => toastError("Falha ao enviar o comando"))
      } catch (error) {
        toastError("Falha ao enviar o comando")
      }
    } else {
      toastError("Insira número mágico válido")
    }
  }

  return (
    <div>
      <ToastContainer />
      <Button onClick={CreateBot}>Criar bot</Button>
      <Button onClick={CreateUser}>Criar usuário</Button>
      <Button delete onClick={EncerrarOrdens}>Encerrar todas ordens</Button>
      <Input type="number" placeholder="Insira o magic number" onChange={e => setNewMagicNumber(e.target.value)} />
      <Button delete onClick={EncerrarMagicNumberOrdens}>Encerrar magic number</Button>
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
                {customer.broker}
                <br />
                {customer.account}
              </Text>
            </Div>
            <Div>
              <Text style={{ color: 'white', backgroundColor: `${StatusOrder(customer.id) === "OK" ? "green" : 'red'}` }}>
                {StatusOrder(customer.id)}
                <br />
                Ordens
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
