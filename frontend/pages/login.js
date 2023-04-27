import { useState } from "react";
import { setCookie,parseCookies,destroyCookie } from "nookies";

import LoginImage from '../public/11116.jpg';

import Image from "next/image";
import Router from "next/router";

import Header from '@/components/Headerlogin';
import axios from "axios";


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [nTentativas, setnTentativas] = useState(1);

  const [textoResposta, settextoResposta] = useState("");

  const takeDate = new Date();
  const month = takeDate.getMonth() + 1 ;

  async function checkNotification() {
    axios.get(`http://localhost:3001/checkmes/${month}`)
    .then(response => {
      if(response.data[0].notificado == false){
        //parse.cookie
        setCookie(null, 'notifiedAboutBills', false, {
          maxAge:60*60*24,
          path:'/',
        });
      }
      })
      .catch(error => {
        console.log(error)
      });
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
          <input 
          className="inputLoginSty" 
          placeholder="Username" 
          type="username" 
          value={username} 
          onChange={(e)=> setUsername(e.target.value)}/>
          <input  
          className="inputLoginSty" 
          placeholder="Senha" 
          type="password" 
          value={password} 
          onChange={(e)=> setPassword(e.target.value)} />
          <div className="textRecsenhaLogin mt-2 mb-3">
            <span className="manterConectadoLogin">
              <input type="checkbox"/>
              Manter Conectado
              </span>
            <span>
              <a href="">Recuperar Senha</a>
            </span>
          </div>
          <button 
          className="mb-4 buttonLogin" 
          onClick={checkNotification}>
            Entrar
          </button>
          <span>
            Não tem uma conta? 
            <strong>Clique aqui</strong>
          </span>
      </div>
      </div>
    </div>
  )
}