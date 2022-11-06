import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { Container, Input, Text, View, Button, Title } from "../../styleglobal";
import Select from 'react-select'
import AuthContext from "../../context/auth";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../components/Toast";
import moment from 'moment'
export default function UserBot() {

    const history = useNavigate()
    const { userID } = useContext(AuthContext);
    const [data, setData] = useState([])
    const [botCustomer, setBotCustomer] = useState([])
    const [newMagicNumber, setNewMagicNumber] = useState()
    const [newValidate, setNewValidate] = useState()
    const [newMultiplicator, setNewMultiplicator] = useState()
    const [botID, setBotID] = useState()
    const [validate, setValidate] = useState()
    const [lote, setLote] = useState()

    useEffect(() => {
        try {
            api.get('/bot')
                .then(result => {
                    setData(result.data)
                })
        } catch (error) {

        }
        try {
            api.get(`/botcustomer/${userID}`)
                .then(result => {
                    setBotCustomer(result.data)
                })
        } catch (error) {

        }
    }, [])
    const handleSave = () => {
        console.log(newMagicNumber + " " + newMultiplicator + " " + userID + " " + newValidate)
        try {
            api.post('/botcustomer', {
                "magicNumber": newMagicNumber,
                "validate": newValidate,
                "lote": newMultiplicator,
                "customerBot": userID
            }).then(() => toastSuccess("Bot vinculado com sucesso"))
        } catch (error) {

        }
    }
    const handleChange = (e) => {
        try {
            api.put(`/botcustomer/${e}`, { validate, lote })
                .then(() => toastSuccess("Bot atualizado com sucesso"))
        } catch (error) {

        }
    }
    const handleChangeMult = (lot, index) => {
        let newBotCustomer = [...botCustomer]
        newBotCustomer[index].lote = lot
        setBotCustomer(newBotCustomer)
        setLote(lot)
    }
    const handleChangeDate = (newData, index) => {

        let newDates = [...botCustomer]
        newDates[index].validate = newData
        setBotCustomer(newDates)
        setValidate(moment(newData).format("YYYY-MM-DD"))
    }
    return (
        <Container>
            <ToastContainer />
            <Title>Bot cadastrado neste usuário</Title>
            {botCustomer && botCustomer.map((bot, index) => (
                <div style={{ margin: "5px" }} key={index}>
                    <Text style={{ margin: "5px" }}>Magic number: {bot.magicNumber}</Text>
                    <input onChange={e => handleChangeDate(e.target.value, index)} style={{ margin: "5px" }} type="date" value={moment(bot.validate).format("YYYY-MM-DD")} />
                    <input onChange={e => handleChangeMult(e.target.value, index)} style={{ margin: "5px", width: "40px" }} type="number" value={bot.lote} />
                    <button onClick={() => handleChange(bot.id)} style={{ margin: "5px" }}>Alterar</button>
                </div>
            ))}
            <Title>Cadastrar bot no usuário</Title>
            <Text>Bot</Text>
            <Select
                options={data}
                getOptionLabel={option => option.magicNumber + " - " + option.description}
                getOptionValue={option => option.magicNumber}
                onChange={e => setNewMagicNumber(e.magicNumber)}
            />
            <Text>Validade</Text>
            <Input type="date" onChange={e => setNewValidate(e.target.value)} value={newValidate} />
            <Text>Multiplicador</Text>
            <Input type="number" onChange={e => setNewMultiplicator(e.target.value)} value={newMultiplicator} />
            <View>
                <Button onClick={() => history('/home')}>Voltar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </View>
        </Container>
    )
}