import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadUsuarios from "./formularios/FormCadUsuario";
import TabelaUsuarios from "./tabelas/TabelaUsuario";

export default function TelaCadastroUsuario(props) {
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);  
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [usuarioParaEdicao, setUsuarioParaEdicao] = useState({
        id:'',
        nickname:'',
        urlAvatar:'', 
        dataIngresso:'',
        mensagens: [],
  });
  const [modoEdicao, setModoEdicao] = useState(false);

    return (
      <Container>
        <Pagina>
            <br />         
          {exibirFormulario ? (
            <FormCadUsuarios
                    exibirFormulario={setExibirFormulario}
                    listaUsuarios={listaUsuarios}
                    setListaUsuarios={setListaUsuarios}
                    usuarioParaEdicao={usuarioParaEdicao}
                    setUsuarioParaEdicao={setUsuarioParaEdicao}
                    modoEdicao={modoEdicao}
                    setModoEdicao={setModoEdicao}
                    setMostrarMensagem={setMostrarMensagem}
                    setMensagem={setMensagem}
                    setTipoMensagem={setTipoMensagem}
            />
          ) : (
            <TabelaUsuarios
                    exibirFormulario={setExibirFormulario}
                    listaUsuarios={listaUsuarios}
                    setListaUsuarios={setListaUsuarios}
                    usuarioParaEdicao={usuarioParaEdicao}
                    setUsuarioParaEdicao={setUsuarioParaEdicao}
                    modoEdicao={modoEdicao}
                    setModoEdicao={setModoEdicao}
            />
          )}
        </Pagina>
      </Container>
    );
  }
