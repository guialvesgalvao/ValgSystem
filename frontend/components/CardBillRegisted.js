export const CardBillRegisted = ({nome,valor,grauImp}) => {

    function obterCor(grauImp) {
        switch (grauImp) {
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
            <span className="ccdTitleCircle" style={{backgroungColor: obterCor(grauImp)}}></span>
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
    </div>
</div>
)
}