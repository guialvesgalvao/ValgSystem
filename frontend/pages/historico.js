import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Toast, ToastHeader, ToastBody} from "reactstrap";
import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Header from '@/components/Header';

export const getStaticProps = async () => {

  const res = await fetch('http://localhost:3001/contas');
  const data = await res.json();

  return {
      props: { dados: data }
  }
}

export default function Painel ({ dados }) {
    // states para inserir //
    const [nomeConta, setNomeConta] = useState('');
    const [valor, setValor] = useState(null);
    const [obs, setObs] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [statusConta, setStatusConta] = useState('');
    const [grauImportancia, setGrauImportancia] = useState(null);
    const [codigoRelacional, setCodigoRelacional] = useState(null);
    const [codigoMensal, setCodigoMensal] = useState(null);

    const [modalInserir, setModalInserir] = useState(false);
    const toggleInserir = () => setModalInserir(!modalInserir);
  
    // states para editar //

    const [idEditar, setIdEditar] = useState(null);
    const [nomeContaEditar, setNomeContaEditar] = useState('');
    const [valorEditar, setValorEditar] = useState(null);
    const [obsEditar, setObsEditar] = useState('');
    const [vencimentoEditar, setVencimentoEditar] = useState('');
    const [statusContaEditar, setStatusContaEditar] = useState('');
    const [keyEditar, setKeyEditar] = useState(null);


    const [modalEditar, setModalEditar] = useState(false);
    const toggleEditar = () => setModalEditar(!modalEditar);

    // states oara deletar //

    const [idDeletar, setIdDeletar] = useState(null);
    const [keyDeletar, setKeyDeletar] = useState(null);

    const [modalDeletar, setModalDeletar] = useState(false);
    const toggleDeletar = () => setModalDeletar(!modalDeletar);

    // outros //

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
        toggleInserir();
      })
      .catch(function (error) {
        console.log(error+"isso é um erro");
      });
      setContas([...Contas, {
        codigo: Contas[Contas.length - 1].codigo + 1,        
        nomeConta: nomeConta,
        valor: valor,
        obs: obs,
        statusConta: statusConta,
        vencimento: vencimento,
        grauImportancia: grauImportancia,
        codigoRelacional: codigoRelacional,
        codigoMensal: codigoMensal}]);
        console.log(Contas);
    }

    async function enviarDadosLocaisEditados (){
      axios.put("http://localhost:3001/editarContas/", {
      id: idEditar,
      nome: nomeContaEditar,
      valor: valorEditar,
      obs: obsEditar,
      statusConta: statusContaEditar,
      vencimento: vencimentoEditar
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(function (response) {
          toggleEditar();
      })
      .catch(function (error) {
          console.log(error + "isso é um erro");
      });

      const novaContas = [...Contas]; 
      novaContas[keyEditar] = { 
        ...novaContas[keyEditar],      
        id: idEditar,
        nomeConta: nomeContaEditar,
        valor: valorEditar,
        obs: obsEditar,
        statusConta: statusContaEditar,
        vencimento: vencimentoEditar
      };
      setContas(novaContas);
    }

    async function editarDadosLocal (Conta,key){
      setKeyEditar(Conta.index);
      setIdEditar(Conta.id);
      setNomeContaEditar(Conta.nome);
      setValorEditar(Conta.valor);
      setObsEditar(Conta.obs);
      setVencimentoEditar(Conta.vencimento);
      setStatusContaEditar(Conta.status);
    }

    async function deleteConta(){
      axios.delete(`http://localhost:3001/delete/${idDeletar}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (res) {
        toggleDeletar();
      })
      .catch(function (error) {
        console.log(error + "isso é um erro");
      });

      const newContas = Contas.filter((conta, i) => i !== keyDeletar);
      setContas(newContas);
    }

    return (
      <div>
        <Header />
          <div className="centerDivs bgDark">
          <div className="divBarTop">
            <div>
              <Button color="primary" onClick={toggleInserir} >
              <FontAwesomeIcon
              icon={faPlus}/>
                  <span className="ml-2"> Inserir Conta</span>
              </Button>
            </div>
            <div>
              <input
              className="rounded"
              placeholder="Conta"
              type="username"
              value={codigo}
              onChange={(e)=> setCodigo(e.target.value)}/>
              <button className="" >
                <FontAwesomeIcon
                 icon={faMagnifyingGlass}
                 />
              </button>
            </div>
          </div>
          <div className="tableStyle mt-5">
        
            <Table dark bordered hover responsive >
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
                  <Button
                  color="info"
                  onClick={() => {
                    editarDadosLocal({
                  index: key,
                  id: Contas.codigo,
                  nome:Contas.nomeConta,
                  valor:Contas.valor,
                  vencimento: Contas.vencimento,
                  status: Contas.statusConta,
                  obs: Contas.obs
                  }),
                  toggleEditar();
                  }}>
                  <FontAwesomeIcon icon={faEdit}/></Button>
                  <span> </span>
                  <Button
                  onClick={() => {
                    setIdDeletar(Contas.codigo),
                    setKeyDeletar(key),
                    toggleDeletar();
                  }}
                  color="danger">
                    <FontAwesomeIcon icon={faClose}/>
                  </Button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        
            <Modal isOpen={modalInserir} toggle={toggleInserir} >
            <ModalHeader toggle={toggleInserir}>Inserir Conta</ModalHeader>
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
                toggleInserir();
              }}>
                Salvar
              </Button>
              <Button color="secondary" onClick={toggleInserir}>
                Cancelar
              </Button>
            </ModalFooter>
                  </Modal>
        
            <Modal isOpen={modalEditar} toggle={toggleEditar} >
            <ModalHeader toggle={toggleEditar}>Editar Conta</ModalHeader>
            <ModalBody>
                    <input
                    title="Conta"
                    className="inputInsertPage"
                    placeholder="Conta"
                    type="username"
                    value={nomeContaEditar}
                    onChange={(e)=> setNomeContaEditar(e.target.value)}/>
                    <input
                    title="Valor"
                    className="inputInsertPage"
                    placeholder="Valor"
                    type="number"
                    value={valorEditar}
                    onChange={(e)=> setValorEditar(e.target.value)}/>
                    <input
                    title="Observação"
                    className="inputInsertPage"
                    placeholder="Observação"
                    type="text"
                    value={obsEditar}
                    onChange={(e)=> setObsEditar(e.target.value)}/>
                    <input
                    title="Vencimento"
                    className="inputInsertPage"
                    placeholder="Vencimento"
                    type="text"
                    value={vencimentoEditar}
                    onChange={(e)=> setVencimentoEditar(e.target.value)}/>
                    <input
                    title="Status"
                    className="inputInsertPage"
                    placeholder="Status"
                    type="text"
                    value={statusContaEditar}
                    onChange={(e)=> setStatusContaEditar(e.target.value)}/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=> {
                enviarDadosLocaisEditados();
                toggleEditar();
              }}>
                Salvar
              </Button>
              <Button color="secondary" onClick={toggleEditar}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modalDeletar} toggle={toggleDeletar} >
            <ModalHeader toggle={toggleDeletar}>Confirmar Exclusão</ModalHeader>
            <ModalBody>
              Você tem certeza que deseja excluir a conta?
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={()=> {
                deleteConta();
                toggleDeletar();
              }}>
                Deletar
              </Button>
              <Button color="secondary" onClick={toggleDeletar}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
          </div>
          </div>
      </div>
    )
}