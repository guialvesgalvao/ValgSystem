import axios from "axios";
import { useState } from "react";

export default function Teste () {

    const [contasRecorrentes,setContasRecorrentes]=useState();

    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    // !!! verificar os dados da response da função buscarContasRecorrentes que setta a variável contasRecorrentes, é necessário verificar a estrutura dos dados para repassar para a requisição da função cadastrarContas adequadamente !!! }

    async function registrarContasNoDB(){
        for(let x=0;x<contasRecorrentes.length;x++){
            async function cadastrarContas () {
                axios.post("http://localhost:3001/cadastrarContas", {
                  nomeConta: contasRecorrentes.nomeConta,
                  valor: contasRecorrentes.valor,
                  obs: '',
                  statusConta: 'NP',
                  vencimento: contasRecorrentes.vencimento+`/${month}`,
                  grauImportancia: contasRecorrentes.grauImportancia,
                  codigoRelacional: contasRecorrentes.codigoRelacional,
                  codigoMensal: contasRecorrentes.codigoMensal // atenção redobrada para esta variavel e sua estrutura
                }, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(function (response) {
                    console.log(`Conta ${x} cadastrada com sucesso!`)
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
    }
    }

    async function buscarContasRecorrentes() {
        axios.get('http://localhost:3001/contasRecorrentes')
        .then(response => {
            console.log(response);
            //setContasRecorrentes(response);
            //registrarContasNoDB();
          })
          .catch(error => {
            console.log(error)
          });
    }

    async function confirmarReset(mesNum) {
      axios.put("http://localhost:3001/confirmarResetMes/", {
      mesNum: mesNum
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(function (response) {
          console.log(response)
      })
      .catch(function (error) {
          console.log(error + "isso é um erro");
      });
    }


    // esta é a função de disparo //

    
    async function testarmes () {
        axios.get(`http://localhost:3001/checkmes/${month}`)
        .then(response => {
            if(response.data[0].resetado){
                buscarContasRecorrentes();
                confirmarReset(month);
            }
          })
          .catch(error => {
            console.log(error)
          });
    }

    
    //  fetch to database for know if the bills were reseted


    // Manipular a resposta da requisição

 
    // Manipular erros na requisição

    //       se a resposta do registro de contas for negativa, então faça isso: 

    if(conectionDatabase){ 
        //código MySQL para registrar todas as novas contas recorrentes na api com as datas necessárias
    }else if (lembreteJáfoiEnviado){ // se as contas do mês já foram registradas, então é necessário fazer uma checagem também se o lembrete já foi enviado, ele deve conter a informação sobre true/false e no caso se for false, deve ser enviado o lembrete

        enviarLembreteFunction();  // a função no caso deve receber um parâmetro que será a mensagem contida no react-tostify

    }// caso o lembrete seja (true) já enviado, então nada deve ser feito



    return(
        <div>
            <h1>Boa</h1>
            <button onClick={testarmes}>TESTAR</button>
        </div>
    )
}