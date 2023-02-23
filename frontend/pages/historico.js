import { Button, Table} from "reactstrap";
import { useState } from "react";

export  const getStaticProps = async () => {

  const res = await fetch('http://localhost:3000/api/carros');
  const data = await res.json();

  return {
      props: { dados: data }
  }
}

export default function Painel ({ dados }) {
    
    const [codigo, setCodigo] = useState('');
    const Contas = dados.result;
    const [updateDATA, setUpdateData] =  useState(false);

    async function UpdateData ( codigo ) {
      await console.log(codigo);
    }

    return (
        <div className="centerDivs">
          
        <div className="centerDivs mb-3">
          <input
          className="intemDefaultSize"
          placeholder="Conta"
          type="username"
          value={codigo}
          onChange={(e)=> setCodigo(e.target.value)}/>
          <button className="intemDefaultSize" >Pesquisar</button>
        </div>

        <div className="tableStyle">
        
          <Table  bordered hover size="sm" >
            <thead>
              <tr>
                <th>#</th>
                <th>Nome Conta</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Obs</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {Contas.map((Contas, key) => (
                  <tr key={Contas.codigo}>
                <th scope="row">
                {Contas.codigo}
                </th>
                <td>
                {Contas.nomeConta}
                </td>
                <td>
                R$ {Contas.valor}
                </td>
                <td>
                {Contas.vencimento}
                </td>
                <td>
                {Contas.statusConta}
                </td>
                <td>
                {Contas.obs}
                </td>
                <td>
                <Button color="info" onClick={() => UpdateData(Contas.codigo)}>editar</Button>
                <span> </span>
                <Button color="danger" >x</Button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        </div>
    )
}