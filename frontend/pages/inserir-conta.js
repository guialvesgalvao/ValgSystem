import { useState } from "react";
import axios from "axios";

export default function inserirConta () {
    
    const [nomeConta, setNomeConta] = useState('');
    const [valor, setValor] = useState(0);
    const [obs, setObs] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [statusConta, setStatusConta] = useState('');

    const dataa2= JSON.stringify({nomeConta,valor,obs,statusConta,vencimento});

    async function axiosPost () {
      axios.post('http://localhost:3000/api/carro', {
        data: {nomeConta:nomeConta ,valor:valor ,obs:obs ,statusConta:statusConta ,vencimento:vencimento} 
      })
      .then(function (response) {
        const t1 = response.config.data;
        const obj = JSON.parse(t1);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error+"isso é um erro");
      });
    }

    return(
        <div className="centerDivs">
                <input 
                className="inputInsertPage" 
                placeholder="Conta" 
                type="username" 
                value={nomeConta} 
                onChange={(e)=> setNomeConta(e.target.value)}/>
                <input  
                className="inputInsertPage" 
                placeholder="Valor" 
                type="number" 
                value={valor} 
                onChange={(e)=> setValor(e.target.value)}/>
                <input 
                className="inputInsertPage" 
                placeholder="Observação" 
                type="text" 
                value={obs} 
                onChange={(e)=> setObs(e.target.value)}/>
                <input 
                className="inputInsertPage" 
                placeholder="Vencimento" 
                type="text" 
                value={vencimento} 
                onChange={(e)=> setVencimento(e.target.value)}/>
                <input 
                className="inputInsertPage" 
                placeholder="Status" 
                type="text" 
                value={statusConta} 
                onChange={(e)=> setStatusConta(e.target.value)}/>
                <button 
                className=""
                onClick={axiosPost}>
                  Registrar
                </button>
        </div>
    )
}

/*async function register() {
  fetch('http://localhost:3000/api/carro', {
    method: 'POST',
    headers: {  'Content-Type': 'application/json; charset=utf8' },
    body: JSON.stringify({nomeConta,valor,obs,statusConta,vencimento})
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });*/