export const getStaticProps = async () => {

  const res = await fetch('http://localhost:3000/api/carros');
  const data = await res.json();
  
  return {
      props: { dados: data }
  }
}

export default function Painel ({ dados }) {
    
    const Contas = dados.result;

    console.log(dados.result[0].codigo)

    return (
        <div>
        <h1>Oi</h1>
        {Contas.map((Contas, key) => (
          <ul key={Contas.codigo}>
            <h6>{Contas.nomeConta}</h6>
            <li>{Contas.valor}</li>
            <li>{Contas.obs}</li>
            <li>{Contas.vencimento}</li>
          </ul>
        ))}
        </div>
    )
}

//{dados.result}