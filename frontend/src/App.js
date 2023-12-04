import TelaCadastroUsuario from "./telaCadastro/TelaCadastroUsuario";
import TelaCadastroMensagem from "./telaCadastro/TelaCadastroMensagens"
import TelaMenu from "./telaCadastro/TelaMenu";
import Tela404 from "./telaCadastro/Tela404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";//componente
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {
          
            }
            <Route path="/usuario" element={<TelaCadastroUsuario />} />
            <Route path="/mensagens" element={<TelaCadastroMensagem />} />
            <Route path="/" element={<TelaMenu />} />
            {
              //... demais telas de cadastro
            }
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;