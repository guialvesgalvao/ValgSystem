import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';

export const CardBillRegisted = ({nome,valor,grauImp}) => {

    function cancelarConta() {
        
    }

    function obterCor(constante) {
        switch (constante) {
          case 1:
            return 'red';
          case 2:
            return 'yellow';
          case 3:
            return 'blue';
          default:
            return 'black';
        }
      }

return(
<div>
    <div className="ccdDivCard mb-3">
        <div className="ccdTitle">
            <span className="ccdTitleName">{nome}</span>
            <span className="ccdTitleCircle" style={{backgroundColor: obterCor(grauImp)}}></span>
        </div>
        <div className="ccdBody">
            <div className="ccdBodyIntem">
                <b>Valor</b>
                <span>{valor}</span>
            </div>
            <div className="ccdBodyIntem">
                <b>Vencimento dia</b>
                <span>24</span>
            </div>
        </div>
        <div className="ccdDivClose">
            <button onClick={cancelarConta} style={{border:"none"}}>
                <FontAwesomeIcon className="ccdIconClose" icon={faClose}/>
            </button>
        </div>
    </div>
</div>
)
}