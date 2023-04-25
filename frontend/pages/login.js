import { useState } from "react";
import { setCookie,parseCookies,destroyCookie } from "nookies";

import LoginImage from '../public/11116.jpg';

import Image from "next/image";
import Router from "next/router";

import Header from '@/components/Headerlogin';


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [nTentativas, setnTentativas] = useState(1);

  const [textoResposta, settextoResposta] = useState("");

  async function checkOlderBill(obj){

  let maiorMes = 0;

    for(let y=0;y<obj.length;y++){
      let objNow= obj[y].vencimento;
      let dataDivider =objNow.split("/")
      let monthNow = dataDivider[1];

      if(monthNow>maiorMes){
        maiorMes = monthNow;
      }
    }

  return maiorMes;
  }

  async function checkNotify () {
    const res = await fetch('http://localhost:3001/contas');
    const data = await res.json();

    let maiorMes = await checkOlderBill(data);

    const getDate = new Date();
    const month = getDate.getMonth() + 1 ;
    
    console.log("Mês atual: "+ month + " Maior mês: " + maiorMes);
    if(month>=maiorMes){
      return true
    }else{
      return false
    }
  }

  async function checkNookies () {
    //setCookie(null, 'notifiedAboutBills', true, {
    //  maxAge:60*60*24,
    //  path:'/',
    //});
    //destroyCookie(null, 'notifiedAboutBills')
    // após vir com true, é necessário mudar para false depois de notificar
    //no valor true, pode ser usado um array onde ele também passa além de true/false para notificado ou não, um valor referente ao mês ou a própria string da palavra referente ao mês
    //*maxAge* = (sugestão) => use o tempo que falta para acabar o mês para designar a duração do cookie

    let cookies = parseCookies();

    if(!cookies.notifiedAboutBills){
      if(checkNotify()){
        setCookie(null, 'notifiedAboutBills', true, {
          maxAge:60*60*24,
          path:'/',
        });
      }else{
        setCookie(null, 'notifiedAboutBills', false, {
          maxAge:60*60*24,
          path:'/',
        });
      }
    }
  }

  async function ConferirDados (){
    if(nTentativas>=3){
      settextoResposta("Quantidade de tentativas excedida, contate o administrador");
    }else{
      if(username=="adm" && password=="adm"){
        checkNookies();
        Router.push('/painel');
        settextoResposta("");
      }
      else{
        setnTentativas(nTentativas+1);
        settextoResposta("Senha Incorreta");
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="containerLogin">
      <div className="divImageLogin">
        <Image
        src={LoginImage}
        alt="texto"
        width={800}
        height={620}/>
      </div>
      <div className="divLoginStyle">
        <div className="textInitialLogin mb-2">
          <h5>Bem vindo ao,</h5>
          <h3><strong>Valg System</strong></h3>
        </div>
        <p>{textoResposta}</p>
          <input className="inputLoginSty" placeholder="Username" type="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
          <input  className="inputLoginSty" placeholder="Senha" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          <div className="textRecsenhaLogin mt-2 mb-3">
            <span className="manterConectadoLogin"><input type="checkbox"/> Manter Conectado</span>
            <span><a href="">Recuperar Senha</a></span>
          </div>
          <button className="mb-4 buttonLogin" onClick={ConferirDados}>Entrar</button>
          <span>Não tem uma conta? <strong>Clique aqui</strong></span>
      </div>
      </div>
    </div>
  )
}