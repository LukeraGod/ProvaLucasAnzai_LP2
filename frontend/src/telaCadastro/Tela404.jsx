import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import { Alert } from "react-bootstrap";

export default function Tela404(props){
    return(
        <Container>
            <Pagina>
                <Alert variant="danger">
                    Não é possível acessar esta página. Verifique as funcionalidades do sistema.
                </Alert> 
            </Pagina>
        </Container>
    );
}