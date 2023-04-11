import { Button, Toast, ToastHeader, ToastBody} from "reactstrap";
import { useState, useEffect,useContext } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';

import Header from '@/components/Header';
import { AppContext } from "@/contexts/AppContext";


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
      let id;
      let nome = "";
      let valorTotal = 0;
      let quantidadeContas = 0;
      let valorContaMaisRecente = 0;
      let grauImportancia = 0;
  
      contasDoDevedor.sort((a, b) => {
        const [diaA, mesA] = a.vencimento.split("/");
        const [diaB, mesB] = b.vencimento.split("/");
        return new Date(2023, mesB - 1, diaB) - new Date(2023, mesA - 1, diaA);
      });
  
      contasDoDevedor.forEach((conta) => {
        if (conta.statusConta === "NP") {
          if (
            conta.codigo !== undefined &&
            conta.nomeConta !== undefined &&
            conta.valor !== undefined &&
            conta.grauImportancia !== undefined &&
            conta.vencimento !== undefined
          ) {
            id = conta.codigo;
            nome = conta.nomeConta;
            valorTotal += conta.valor;
            quantidadeContas++;
            grauImportancia = conta.grauImportancia;
  
            if (valorContaMaisRecente === 0) {
              valorContaMaisRecente = conta.valor;
            }
          }
        }
      });
  
      if (
        id !== undefined &&
        nome !== "" &&
        valorTotal !== 0 &&
        quantidadeContas !== 0 &&
        valorContaMaisRecente !== 0 &&
        grauImportancia !== 0
      ) {
        novoArray.push({
          id,
          nome,
          valorTotal,
          quantidadeContas,
          valorContaMaisRecente,
          grauImportancia,
        });
      }
    });
  
    return novoArray;
  }


  const arraySimplificado = simplificarContas(novoArray);

  let valorTotalContas = 0;

  for(var x=0;x<arraySimplificado.length;x++){
    valorTotalContas += arraySimplificado[x].valorTotal;
  }

  return {
      props: { dados: arraySimplificado, totaldasContas: valorTotalContas }
  }
}

export default function Painel ({ dados, totaldasContas }) {

    const {teste} = useContext(AppContext);

    console.log(teste)
    
    const [Contas,setContas] = useState(dados);
    const [totalContas,setTotalContas] = useState(totaldasContas.toFixed(2));

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
      console.log(Contas)


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

    const notify = async () => toast.success('Conta paga com sucesso', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


    return (
        <div>
          <Header />
          <div className="bgDark">
            <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            <ToastContainer />
            <div className="container">
              <h4 className="valorTotalTitle">Valor Total do mês: R$ {totalContas}</h4>
          
              <div className="orgCards">
                {Contas.map((Contas, key) => (
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
                    ))}
              </div>
            </div>
          </div>
        </div>
    )
}



