import { useState } from "react";

import LoginImage from '../public/11116.jpg';

import Image from "next/image";
import Router from "next/router";

import Header from '@/components/Headerlogin';


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [nTentativas, setnTentativas] = useState(1);

  const [textoResposta, settextoResposta] = useState("");

  async function ConferirDados (){
    if(nTentativas>=3){
      settextoResposta("Quantidade de tentativas excedida, contate o administrador");
    }else{
      if(username=="adm" && password=="adm"){
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