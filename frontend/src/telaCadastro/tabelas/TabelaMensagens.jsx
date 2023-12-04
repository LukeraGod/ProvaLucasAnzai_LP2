import { Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarMessages, excluirMessage } from "../../redux/messageReducer.js";
import ESTADO from "../../recursos/estado";

export default function TabelaMensagens(props) {
    const {estado,mensagem,listaMensagens} = useSelector(state=>state.msg);
    const dispatch = useDispatch();
    function excluirMensagem(msg) {
        if (window.confirm('Deseja realmente excluir esta mensagem?')) {
            dispatch(excluirMessage(msg));
        }
    }
    function editarMensagem(msg){
        props.setmensagemParaEdicao(msg);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }
    useEffect(() => {
        dispatch(buscarMessages());
    }, [dispatch]);

    function apagarMensagens() {
        setTimeout(() => {
            toast.dismiss();
        }, 5000)
        return null;
    }
    return (
        <Container>
            {estado === ESTADO.ERRO ?
                toast.error(({ closeToast }) =>
                    <div>
                        <p>{mensagem}</p>

                    </div>
                    , { toastId: estado })
                :
                null
            }
            {
            estado === ESTADO.PENDENTE ?
                toast(({ closeToast }) =>
                    <div>
                        <Spinner animation="border" role="status"></Spinner>
                        <p>Processando a requisição...</p>
                    </div>
                    , { toastId: estado })
                :
                null
            }
            {
                estado === ESTADO.OCIOSO ?
                apagarMensagens()
                :
                null
            }
            <br />
           <Button type="button"onClick={() => {
                                props.setModoEdicao(false);
                                props.exibirFormulario(true)
                            }}>Nova Mensagem</Button>
            <Table striped bordered hover>
                <thead>
                <br />  
                    <tr>
                        <th>ID</th>
                        <th>DATA e HORA</th>
                        <th>STATUS</th>
                        <th>MENSAGEM</th>
                        <th>USUÁRIO</th>
                    </tr>
                </thead>
                <tbody>
                {                
                       listaMensagens?.map((msg) => {
                            return (<tr key={msg.id}>
                                <td>{msg.dataHora}</td>
                                <td>{msg.lida}</td>
                                <td>{msg.mensagens}</td>
                                <td>{msg.usuario}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {
                                        excluirMensagem(msg);
                                    }}>
                                        Excluir
                                    </Button> {' '}
                                    <Button onClick={ ()=>{
                                        editarMensagem(msg);
                                    }

                                    } variant="warning">
                                       Alterar
                                    </Button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}