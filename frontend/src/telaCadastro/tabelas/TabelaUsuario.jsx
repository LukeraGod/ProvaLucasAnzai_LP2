import { Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarUsuarios, removerUsuario } from "../../redux/usuarioReducer";
import ESTADO from "../../recursos/estado";
export default function TabelaUsuarios(props) {
    const {estado,mensagem,listaUsuarios} = useSelector(state=>state.usuario);
    const dispatch = useDispatch();
    function excluirUsuario(usuario) {
        if (window.confirm('Deseja realmente excluir esse Usuário?')) {
            dispatch(removerUsuario(usuario));
        }
    }
    function editarUsuario(usuario){
        props.setUsuarioParaEdicao(usuario);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }
    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    function apagarMensagens() {
        setTimeout(() => {
            toast.dismiss();
        }, 2000)
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
                            }}>Novo Usuário</Button>
            <Table striped bordered hover>
                <thead>
                <br />  
                    <tr>
                        <th>NickName</th>
                        <th>urlAvatar</th>
                        <th>Data Ingresso</th>
                        <th>Mensagens</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                {                
                       listaUsuarios?.map((usuario) => {
                            return (<tr key={usuario.id}>
                                <td>{usuario.nickname}</td>
                                <td>{usuario.dataIngresso}</td>
                                <td>{usuario.mensagens}</td>
                                <td>{usuario.id}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {
                                        excluirUsuario(usuario);
                                    }}>
                                        Excluir
                                    </Button> {' '}
                                    <Button onClick={ ()=>{
                                        editarUsuario(usuario);
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

