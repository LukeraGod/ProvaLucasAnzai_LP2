import Menu from "./Menu";
import Cabecalho from "./Cabecalho";

export default function Pagina(props) {
    return (
        <>
            <Cabecalho conteudo='BATE-PAPO WEB' />
            <Menu />
            <div>
                {
                    // filhos da página
                }
                {props.children} 
            </div>
        </>
    )
}