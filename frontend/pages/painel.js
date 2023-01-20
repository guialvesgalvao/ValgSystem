import { Button, Table, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";

import { useState } from "react";

export  const getStaticProps = async () => {

  const res = await fetch('http://localhost:3000/api/carros');
  const data = await res.json();

  return {
      props: { dados: data }
  }
}

export default function Painel ({ dados }) {
    
    const Contas = dados.result;

    const [updateDATA, setUpdateData] =  useState(false);

    async function UpdateData ( codigo ) {
      await console.log(codigo);
    }
 

    return (
        <div>
        <div className="tableStyle">
          <Table  bordered hover size="sm" >
          <Offcanvas
            direction="top"
            fade={true}
            scrollable
            isOpen={updateDATA}
          >
            <OffcanvasHeader isOpen={updateDATA}>
              Offcanvas
              <Button onClick={() => setUpdateData(false)}>fechar</Button>
            </OffcanvasHeader>
            <OffcanvasBody>
              <strong>
                This is the Offcanvas body.
              </strong>
            </OffcanvasBody>
          </Offcanvas>
          <Button onClick={() => setUpdateData(true)}>fechar</Button>

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

/*        {Contas.map((Contas, key) => (
  <ul key={Contas.codigo}>
  <h6>{Contas.nomeConta}</h6>
  <li>{Contas.valor}</li>
  <li>{Contas.obs}</li>
  <li>{Contas.vencimento}</li>
</ul>
))}*/