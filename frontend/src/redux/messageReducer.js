import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const urlBase = "https://backend-bcc-2-b.vercel.app/Message";

export const buscarMessages = createAsyncThunk('message/buscarMessages', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            const MessagesFormatadas = dados.listaMensagens.map(Message => {
                return {
                    id: Message.id,
                    dataHora: Message.dataHora,
                    lida: Message.lida,
                    mensagem: Message.mensagem,
                    usuario: {
                        id: Message.usuario.id,
                        nickname: Message.usuario.nickname,
                        urlAvatar: Message.usuario.urlAvatar,
                        dataIngresso: Message.usuario.dataIngresso,
                        mensagens: Message.usuario.mensagens
                    }
                };
            });

            return {
                status: dados.status,
                mensagem: "",
                listaMensagens: MessagesFormatadas
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaMensagens: []
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar mensagem: " + erro.message,
            listaMensagens: []
        };
    }
});

export const incluirMessage = createAsyncThunk('incluirMessage', async ({ mensagem, usuarioId }) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mensagem,
                usuario: {
                    id: usuarioId
                }
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                Message: { id: dados.id, mensagem, lida: false, usuario: { id: usuarioId } },
                mensagem: dados.mensagem
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível cadastrar a Messagem " + erro.message
        };
    }
});

export const atualizarMessage = createAsyncThunk('atualizarMessage', async ({ id, lida }) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lida
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                Message: { id, lida }
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível atualizar Message " + erro.message
        };
    }
});

export const excluirMessage = createAsyncThunk('excluirMessage', async (id) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                Message: { id }
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível excluir mensagem " + erro.message
        };
    }
});


const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    Messages: [] 
}

const MessageSlice = createSlice({
    name: 'message',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMessages.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando Messages';
            })
            .addCase(buscarMessages.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Mensagens recuperadas do backend!";
                    state.Messages = action.payload.listaMensagens;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.Messages = [];
                }
            })
            .addCase(buscarMessages.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.Messages = [];
            })
            .addCase(incluirMessage.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(incluirMessage.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.Messages.push(action.payload.Message);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMessage.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarMessage.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(atualizarMessage.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.Messages.findIndex((Message) => Message.id === action.payload.Message.id);
                    state.Messages[indice] = action.payload.Message;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMessage.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirMessage.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(excluirMessage.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.Messages = state.Messages.filter((Message) => Message.id !== action.payload.Message.id);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(excluirMessage.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default MessageSlice.reducer;
