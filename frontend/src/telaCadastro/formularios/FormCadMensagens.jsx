import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import { incluirMessage, atualizarMessage} from "../../redux/messageReducer";

export default function FormCadMessages(props) {
    const mensagemVazio = {
        id:'0', 
        dataHora: '',
        lida:'', 
        mensagem:'', 
        usuario: '',
    }
    const estadoInicialMensagem = props.mensagemParaEdicao;
    const [msg, setMensagens] = useState(estadoInicialMensagem);
    const [formValidado, setFormValidado] = useState(false);

    const { estado, mensagem, mensagens } = useSelector((state) => state.estado);

    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setMensagens({ ...msg, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(incluirMessage(msg));
            }
            else {
                dispatch(atualizarMessage(msg));
                props.setModoEdicao(false);
                props.setmensagemParaEdicao(mensagemVazio);
            }
            setMensagens(mensagemVazio); 
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>

            </div>
            , { toastId: estado });
    }
    else if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Buscando a requisição...</p>
            </div>
            , { toastId: estado });
    }
    else {
        toast.dismiss();
        return (
            
            <Container>
                <h2>CRIAÇÃO DE BATE PAPO WEB</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="id:"
                                    className="mb-3"
                                >

                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        id="id"
                                        name="id"
                                        value={msg.id}
                                        onChange={manipularMudancas}
                                        disabled />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Insira seu id de usuario</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Data e Hora:"
                                    className="mb-3"
                                >

                                    <Form.Control
                                        type="date"
                                        placeholder="0"
                                        id="dataHora"
                                        name="dataHora"
                                        value={msg.dataHora}
                                        onChange={manipularMudancas}
                                        disabled />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="lida:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        id="lida"
                                        name="lida"
                                        value={msg.lida}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Mensagem:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite a Mensagem"
                                        id="mensagem"
                                        name="mensagem"
                                        value={msg.mensagem}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Insira o texto</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Usuario:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Selecione um usuário"
                                        id="usuario"
                                        name="usuario"
                                        value={msg.usuario}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Selecione um usuário</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex justify-content-end">
                            <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false)
                            }
                            }>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}