import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { Container, Input, Text, View, Button, Title } from "../../styleglobal";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../components/Toast";
import messages from "../../components/Toast/messages.json"
export default function CreateEA() {
    const history = useNavigate()
    const [description, setDescription] = useState('')
    const [magicNumber, setMagicNumber] = useState(0)

    const handleSubmit = () => {
        if (description !== null && magicNumber !== 0) {
            try {
                api.post('/bot', { magicNumber, description })
                    .then(() => {
                        toastSuccess(messages.successBotCreate)
                    }).then(() => setTimeout(() => history('/home'), 2000))
                    .catch(error => {
                        toastError("Magic number repetido")
                    })
            } catch (error) {
                toastError(messages.errorCreateBot)
            }
        }else{
            toastError("Insira descrição e número mágico")
        }
    }

    return (
        <Container>
            <ToastContainer />
            <Title>Cadastrar novo bot</Title>
            <Text>Magic Number</Text>
            <Input onChange={e => setMagicNumber(e.target.value)} value={magicNumber} />
            <Text>Descrição</Text>
            <Input onChange={e => setDescription(e.target.value)} value={description} />
            <View>
                <Button onClick={() => history('/home')} >Voltar</Button>
                <Button onClick={() => handleSubmit()} >Salvar</Button>
            </View>
        </Container>
    )
}