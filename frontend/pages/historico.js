import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export  const getStaticProps = async () => {

  const res = await fetch('http://localhost:3001/contas');
  const data = await res.json();

  return {
      props: { dados: data }
  }
}

export default function Painel ({ dados }) {

    const [nomeConta, setNomeConta] = useState('');
    const [valor, setValor] = useState(null);
    const [obs, setObs] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [statusConta, setStatusConta] = useState('');
    const [grauImportancia, setGrauImportancia] = useState(null);
    const [codigoRelacional, setCodigoRelacional] = useState(null);
    const [codigoMensal, setCodigoMensal] = useState(null);
  
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [codigo, setCodigo] = useState('');
    const [Contas, setContas] = useState(dados)
    


    async function axiosPost () {
      axios.post("http://localhost:3001/cadastrarContas", {
        nomeConta: nomeConta,
        valor: valor,
        obs: obs,
        statusConta: statusConta,
        vencimento: vencimento,
        grauImportancia: grauImportancia,
        codigoRelacional: codigoRelacional,
        codigoMensal: codigoMensal
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        toggle();
      })
      .catch(function (error) {
        console.log(error+"isso é um erro");
      });
    }

    return (
        <div className="centerDivs">

        <div className="divBarTop">

          <div>
            <Button color="primary" onClick={toggle} >
            <FontAwesomeIcon 
            icon={faPlus}/>
                <span className="ml-2"> Inserir Conta</span>
            </Button>
          </div>

          <div>
            <input
            className=""
            placeholder="Conta"
            type="username"
            value={codigo}
            onChange={(e)=> setCodigo(e.target.value)}/>
            <button className="" >
              <FontAwesomeIcon
               icon={faMagnifyingGlass}
               size=""/>
            </button>
          </div>

        </div>

        <div className="tableStyle mt-5">
        
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
                <Button color="info" onClick={() => UpdateData(Contas.codigo)}>          <FontAwesomeIcon icon={faEdit}/></Button>
                <span> </span>
                <Button color="danger" >
                  <FontAwesomeIcon icon={faClose}/>
                </Button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Inserir Conta</ModalHeader>
          <ModalBody>
                  <input
                  title="Conta"
                  className="inputInsertPage"
                  placeholder="Conta"
                  type="username"
                  value={nomeConta}
                  onChange={(e)=> setNomeConta(e.target.value)}/>
                  <input
                  title="Valor"
                  className="inputInsertPage"
                  placeholder="Valor"
                  type="number"
                  value={valor}
                  onChange={(e)=> setValor(e.target.value)}/>
                  <input
                  title="Observação"
                  className="inputInsertPage"
                  placeholder="Observação"
                  type="text"
                  value={obs}
                  onChange={(e)=> setObs(e.target.value)}/>
                  <input
                  title="Vencimento"
                  className="inputInsertPage"
                  placeholder="Vencimento"
                  type="text"
                  value={vencimento}
                  onChange={(e)=> setVencimento(e.target.value)}/>
                  <input
                  title="Status"
                  className="inputInsertPage"
                  placeholder="Status"
                  type="text"
                  value={statusConta}
                  onChange={(e)=> setStatusConta(e.target.value)}/>
                  <input
                  title="Grau Importância"
                  className="inputInsertPage"
                  placeholder="Grau Importância"
                  type="number"
                  value={grauImportancia}
                  onChange={(e)=> setGrauImportancia(e.target.value)}/>
                  <input
                  title="Código Relacional"
                  className="inputInsertPage"
                  placeholder="Código Relacional"
                  type="number"
                  value={codigoRelacional}
                  onChange={(e)=> setCodigoRelacional(e.target.value)}/>
                  <input
                  title="Código Mensal"
                  className="inputInsertPage"
                  placeholder="Código Mensal"
                  type="number"
                  value={codigoMensal}
                  onChange={(e)=> setCodigoMensal(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=> {
              axiosPost();
              toggle();
            }}>
              Salvar
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
                </Modal>
        </div>
        </div>
    )
}