import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadMessages from "./formularios/FormCadMensagens";
import TabelaMensagens from "./tabelas/TabelaMensagens";

export default function TelaCadastroMensagem(props) {
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [listaMensagens, setListaMensagens] = useState([]);  
  const [mensagemParaEdicao, setmensagemParaEdicao] = useState({
    id:'', 
    dataHora: '',
    lida:'', 
    mensagem:'', 
    usuario: '',
  });
  const [modoEdicao, setModoEdicao] = useState(false);

    return (
      <Container>
        <Pagina>
            <br />         
          {exibirFormulario ? (
            <FormCadMessages
                    exibirFormulario={setExibirFormulario}
                    listaMensagens={listaMensagens}
                    setListaMensagens={setListaMensagens}
                    mensagemParaEdicao={mensagemParaEdicao}
                    setmensagemParaEdicao={setmensagemParaEdicao}
            />
          ) : (
            <TabelaMensagens
                    exibirFormulario={setExibirFormulario}
                    listaMensagens={listaMensagens}
                    setListaMensagens={setListaMensagens}
                    mensagemParaEdicao={mensagemParaEdicao}
                    setmensagemParaEdicao={setmensagemParaEdicao}
            />
          )}
        </Pagina>
      </Container>
    );
  }
