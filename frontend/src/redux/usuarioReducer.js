import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../recursos/estado';
import { buscarMessages } from "./messageReducer";

const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';
export const buscarUsuarios = createAsyncThunk('usuario/buscarUsuarios', async (_, { dispatch }) => {
    try {
        const messageRequest = await dispatch(buscarMessages());

        if (messageRequest.payload.status) {
            const resposta = await fetch(urlBase, { method: 'GET' });
            const dados = await resposta.json();

            if (dados.status) {
                const usuariosFormatados = dados.listaUsuarios.map(usuario => {
                    return {
                        id: usuario.id,
                        nickname: usuario.nickname,
                        urlAvatar: usuario.urlAvatar,
                        dataIngresso: usuario.dataIngresso,
                        mensagens: messageRequest.payload.listaMensagens.filter(message => message.usuario.id === usuario.id)
                    };
                });

                return {
                    status: true,
                    listaUsuarios: usuariosFormatados,
                    mensagem: ''
                };
            } else {
                return {
                    status: false,
                    listaUsuarios: [],
                    mensagem: 'Falha ao recuperar os usuários da base de dados.'
                };
            }
        } else {
            return {
                status: false,
                listaUsuarios: [],
                mensagem: 'Erro ao recuperar as mensagens da base de dados.'
            };
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: [],
            mensagem: 'Não foi possível restaurar dados do banco de dados: ' + erro.message
        };
    }
});

export const adicionarUsuario = createAsyncThunk('usuario/adicionar', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: usuario.nickname,
                urlAvatar: usuario.urlAvatar
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            return {
                status: dados.status,
                usuario: dados.id,
                mensagem: 'Usuário incluído com sucesso!'
            };
        } else {
            return {
                status: dados.status,
                mensagem: 'Ocorreu um erro ao adicionar o usuário.',
                usuario: dados 
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar o usuário: ' + erro.message,
            usuario: {} 
        };
    }
});

export const atualizarUsuario = createAsyncThunk('usuario/atualizar', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: usuario.id,
                nickname: usuario.nickname,
                urlAvatar: usuario.urlAvatar
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            return {
                status: dados.status,
                mensagem: 'Usuário atualizado com sucesso!',
                usuario: dados 
            };
        } else {
            return {
                status: dados.status,
                mensagem: 'Falha ao atualizar o usuário.',
                usuario: dados 
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: 'Falha ao atualizar o usuário: ' + erro.message,
            usuario: {}
        };
    }
});

export const removerUsuario = createAsyncThunk('usuario/remover', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: usuario.id
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            return {
                status: dados.status,
                mensagem: 'Usuário excluído com sucesso!',
                usuario: dados 
            };
        } else {
            return {
                status: dados.status,
                mensagem: 'Falha ao excluir o usuário.',
                usuario: dados 
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao excluir o usuário: ' + erro.message,
            usuario: {}
        };
    }
});

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: [],
};

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuarios.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando usuarios...";
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios = action.payload.usuarios;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })
            .addCase(adicionarUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.usuarios.push(action.payload.usuario);
                state.mensagem = action.payload.mensagem;
            })
            .addCase(adicionarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando usuario...";
            })
            .addCase(adicionarUsuario.rejected, (state, action) => {
                state.mensagem = "Erro ao adicionar a usuario: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                const indice = state.usuarioss.findIndex(usuario => usuario.codigo === action.payload.usuario.codigo);
                state.usuarios[indice] = action.payload.usuario;
                state.mensagem = action.payload.mensagem;

            })
            .addCase(atualizarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Atualizando usuario...";
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.mensagem = "Erro ao atualizar a usuario: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
            .addCase(removerUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.usuarios = state.usuarioss.filter(usuario => usuario.codigo !== action.payload.usuario.codigo);
            })
            .addCase(removerUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Removendo usuario...";
            })
            .addCase(removerUsuario.rejected, (state, action) => {
                state.mensagem = "Erro ao remover a usuario: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
    }
});

export default usuarioSlice.reducer;
