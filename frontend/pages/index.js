import { useState } from "react";
import Router from "next/router";

export default function Home() {

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
    <div className="telaLogin">
    <div className="loginStyle">
      <h2>Valg Sistem</h2>
      <h4>LOGIN</h4>
      <p>{textoResposta}</p>
        <input className="inputLoginSty" placeholder="Username" type="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        <input  className="inputLoginSty" placeholder="Senha" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={ConferirDados}>Entrar</button>
    </div>
    </div>
  )
}