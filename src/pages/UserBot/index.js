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
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [botCustomer, setBotCustomer] = useState([])
    const [newMagicNumber, setNewMagicNumber] = useState()
    const [newValidate, setNewValidate] = useState()
    const [newMultiplicator, setNewMultiplicator] = useState()
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
    }, [reload])

    const handleSave = () => {
        try {
            api.post('/botcustomer', {
                "magicNumber": newMagicNumber,
                "validate": newValidate,
                "lote": newMultiplicator,
                "customerBot": userID
            }).then(() => {
                toastSuccess("Bot vinculado com sucesso")
                setReload(prevReload => !prevReload)
            }).catch(error => {
                toastError("Bot já cadastrado")
            })
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
    const handleChangeMult = (lot, index, valid) => {
        let newBotCustomer = [...botCustomer]
        newBotCustomer[index].lote = lot
        newBotCustomer[index].validate = valid
        setBotCustomer(newBotCustomer)
        setValidate(moment(valid).format("YYYY-MM-DD"))
        setLote(lot)
    }

    return (
        <Container>
            <ToastContainer />
            <Title>Bot cadastrado neste usuário</Title>
            {botCustomer && botCustomer.map((bot, index) => (
                <div style={{ margin: "5px" }} key={index}>
                    <Text style={{ margin: "5px" }}>Magic number: {bot.magicNumber}</Text>
                    <input onChange={e => handleChangeMult(bot.lote, index, e.target.value)} style={{ margin: "5px" }} type="date" value={moment(bot.validate).format("YYYY-MM-DD")} />
                    <input onChange={e => handleChangeMult(e.target.value, index, bot.validate)} style={{ margin: "5px", width: "40px" }} type="number" value={bot.lote} />
                    <button onClick={() => handleChange(bot.id)} style={{ margin: "5px" }}>Alterar</button>
                </div>
            ))}
            <Title>Cadastrar bot no usuário</Title>
            <Text>Bot</Text>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            </div>
        </Container>
    )
}