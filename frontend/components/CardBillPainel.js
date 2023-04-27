import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faStar } from "@fortawesome/free-solid-svg-icons";

import Axios from "axios";

export default function CardBillPainel ({key, nome, grauImportancia, valorContaMaisRecente, valorContaTotal, quantidadeContas, contaId,obterCor,pagarConta, Contas}) {
/*
key
nome
grauImportancia
valorContaMaisRecente
valorContaTotal
quantidadeContas
contaId
*/

    return(
        <div className="mycard mt-4" key={key}>
        <div className="mycardHeader">
          <span className="mycardTitle">{nome}</span>
          <FontAwesomeIcon style={{ color: obterCor(grauImportancia) }} className="mycardStar" icon={faStar}/>
        </div>
        <div className="mycardBody">
         <div className="mycardText">
          <span className="mycardSpan" >Valor Mês: R$ {valorContaMaisRecente}</span>
          <span className="mb-1 mycardSpan">Valor Total: R$ {valorContaTotal}</span>
          <span className="mb-3 mycardSpan">Prestações: {quantidadeContas}</span>
         </div>
         <div className="mycardButtons">
          <button onClick={() => {pagarConta(contaId, valorContaMaisRecente, key)}} className="mycardPayedButton">Pagar</button>
          <button className="mycardUpstarsButton">
            <FontAwesomeIcon
             onClick={() => {elevarGrauImportancia(key)}}
             icon={faArrowCircleUp}/>
            <FontAwesomeIcon icon={faStar}/>
          </button>
         </div>
        </div>
      </div>
    )
}



export  function CardBillPainel1 ({key, Contas, setContas, notify, setTotalContas, totalContas, quantidadeContas}) {
    /*
    key
    nome
    grauImportancia
    valorContaMaisRecente
    valorContaTotal
    quantidadeContas
    contaId
    */

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
  
      async function pagarConta (codigo, valor, index) {
  
        Axios.put(`http://localhost:3001/pagar`, {
          id: codigo
        })
        .then((response) => {
          console.log(response);
        });
  
        setTotalContas((totalContas - valor).toFixed(2))
  
        if (Contas[index].quantidadeContas > 1) {
          // Atualizar o valor de prestações no objeto correspondente no array
          const novoArray = [...Contas];
          novoArray[index] = {
            ...novoArray[index],
            quantidadeContas: novoArray[index].quantidadeContas - 1,
          };
          setContas(novoArray);
        } else {
          // Remover o objeto correspondente do array
          const novoArray = Contas.filter((conta, i) => i !== index);
          setContas(novoArray);
        }
        notify();
      }
  
      async function elevarGrauImportancia(index) {
        if(Contas[index].grauImportancia<3){
        Contas[index].grauImportancia++;
        }
        console.log(Contas[index].grauImportancia)
      }
    
        return(
            <div className="mycard mt-4" key={Contas.id}>
                    <div className="mycardHeader">
                      <span className="mycardTitle">{Contas.nome}</span>
                      <FontAwesomeIcon style={{ color: obterCor(Contas.grauImportancia) }} className="mycardStar" icon={faStar}/>
                    </div>
                    <div className="mycardBody">
                     <div className="mycardText">
                      <span className="mycardSpan" >Valor Mês: R$ {Contas.valorContaMaisRecente}</span>
                      <span className="mb-1 mycardSpan">Valor Total: R$ {Contas.valorTotal}</span>
                      <span className="mb-3 mycardSpan">Prestações: {Contas.quantidadeContas}</span>
                     </div>
                     <div className="mycardButtons">
                      <button onClick={() => {pagarConta(Contas.id, Contas.valorContaMaisRecente, key)}} className="mycardPayedButton">Pagar</button>
                      <button className="mycardUpstarsButton">
                        <FontAwesomeIcon
                         onClick={() => {elevarGrauImportancia(key)}}
                         icon={faArrowCircleUp}/>
                        <FontAwesomeIcon icon={faStar}/>
                      </button>
                     </div>
                    </div>
                  </div>
        )
    }