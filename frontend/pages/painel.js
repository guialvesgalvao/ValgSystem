import { Button} from "reactstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faStar } from "@fortawesome/free-solid-svg-icons";

export  const getStaticProps = async () => {

  const res = await fetch('http://localhost:3001/contas');
  const data = await res.json();

   function organizarPorCodigoRelacional(arrayInicial) {
    const mapeamento = {};
  
    for (const objeto of arrayInicial) {
      const codigoRelacional = objeto.codigoRelacional;
      if (!mapeamento[codigoRelacional]) {
        mapeamento[codigoRelacional] = [];
      }
      mapeamento[codigoRelacional].push(objeto);
    }
  
    const novoArray = Object.values(mapeamento);
    return novoArray;
  }

  const novoArray = organizarPorCodigoRelacional(data);

  function simplificarContas(array) {
    const novoArray = [];
    
    array.forEach((contasDoDevedor) => {
      let id ;
      let nome = "";
      let valorTotal = 0;
      let quantidadeContas = 0;
      let valorContaMaisRecente = 0;
      let grauImportancia = 0;

      contasDoDevedor.sort((a, b) => {
        const [diaA, mesA] = a.vencimento.split('/');
        const [diaB, mesB] = b.vencimento.split('/');
        return new Date(2023, mesB - 1, diaB) - new Date(2023, mesA - 1, diaA);
      });
      
      contasDoDevedor.forEach((conta) => {
        if(conta.statusConta==="NP"){
        id = Math.random() + quantidadeContas,
        nome = conta.nomeConta;
        valorTotal += conta.valor;
        quantidadeContas++;
        grauImportancia = conta.grauImportancia;
      }


      if (valorContaMaisRecente === 0) {
        valorContaMaisRecente = conta.valor;
      }

      });
      
      novoArray.push({ id, nome, valorTotal, quantidadeContas,valorContaMaisRecente, grauImportancia });
    });
    
    return novoArray;
  }


const arraySimplificado = simplificarContas(novoArray);

  return {
      props: { dados: arraySimplificado }
  }
}

export default function Painel ({ dados }) {
    
    const Contas = dados;

    console.log(Contas)

    return (
        <div className="container">

          <h4>Valor Total do mês: R$ 3.000,00</h4>
          
          {Contas.map((Contas, key) => (

            <div className="mycard mt-4" key={Contas.id}>


              <div className="mycardHeader">
                <span className="mycardTitle">{Contas.nome}</span>
                <FontAwesomeIcon className="mycardStar" icon={faStar}/>
              </div>

              <div className="mycardBody">

               <div className="mycardText">
                <span >Valor Mês: R$ </span>
                <span className="mb-1">Valor Total: R$ {Contas.valorTotal}</span>
                <span className="mb-3">Prestações: {Contas.quantidadeContas}</span>
               </div>

               <div className="mycardButtons">
                <button className="mycardPayedButton">Paga</button>
                <button className="mycardUpstarsButton">
                  <FontAwesomeIcon icon={faArrowCircleUp}/>
                  <FontAwesomeIcon icon={faStar}/>
                </button>
               </div>

              </div>

            </div>
              ))}

        </div>
    )
}



