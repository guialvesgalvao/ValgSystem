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



  return {
      props: { dados: data, testeee: novoArray }
  }
}

export default function Painel ({ dados, testeee }) {

   console.log(testeee)
    
    const bill = Contas[1];


    return (
        <div className="container">

          <h4>Valor Total do mês: R$ 3.000,00</h4>

            <div className="mycard mt-4">

              <div className="mycardHeader">
                <span className="mycardTitle">{bill.nomeConta}</span>
                <FontAwesomeIcon className="mycardStar" icon={faStar}/>
              </div>

              <div className="mycardBody">

               <div className="mycardText">
                <span >Valor Mês: R$ {bill.valor}</span>
                <span className="mb-1">Valor Total: R$ 15,00</span>
                <span className="mb-3">Prestações: 3</span>
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


        </div>
    )
}

