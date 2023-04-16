import { useState } from "react";
import Header from "@/components/Header";
import {CardBillRegisted} from "@/components/CardBillRegisted";

export default function RegisterBills () {
            //dados que deverá conter na conta:
        //Nome: Nome da Conta
        //Valor: Defina um valor fixo ou médio para a conta, qualquer maior importância, o usuário poderá alterar na aba de todas as contas
        //Dia do vencimento: servirá para definir qual dia a conta vence todo mês Day(fixo)/Month(Variável);
        //Obs: n precisa
        //Status da conta: virá por padrão como falso [NP (Não Pago)];
        //Grau importância: o usuário deverá ter uma opção de input para as seguintes alternativas: 1 - Grave 2 - Média 3 - Leve
        //Código Relacional: cada conta recorrente deverá conter um id único dela ( verificar bugs com o painel! )
        //Código Mensal: É settada uma data de ínicio do sistema e apartir daí todos os meses seguintes começam a ser relacionados por número, exemplo: 1 -> fevereiro/23 2-> março/23

        //Código Mensal -> pegar o mês atual e colocar a partir deste
        //Código Relacional -> somar +1 a cada
        //Obs -> vazio
        //StatusConta -> pré-settado como 'NP'

        
        //Opções para funções de 'delete' mysql;

        const [nomeConta, setNomeConta] = useState('');
        const [valor, setValor] = useState(null);
        const [obs, setObs] = useState('');
        const [vencimento, setVencimento] = useState('');
        const [statusConta, setStatusConta] = useState('NP');
        const [grauImportancia, setGrauImportancia] = useState(null);
        const [codigoRelacional, setCodigoRelacional] = useState(null);
        const [codigoMensal, setCodigoMensal] = useState(null);

    return(        
        <div>
            <Header />
            <div className="centerDivs mb-3 mt-2">
                <h3>Cadastrar Contas Recorrentes</h3>
            </div>
            <div className="containerIndex">
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
                    placeholder="Valor médio"
                    type="number"
                    value={valor}
                    onChange={(e)=> setValor(e.target.value)}/>
                    <input
                    title="Vencimento"
                    className="inputInsertPage"
                    placeholder="Dia de vencimento"
                    type="text"
                    value={vencimento}
                    onChange={(e)=> setVencimento(e.target.value)}/>

                    <input
                    title="Grau Importância"
                    className="inputInsertPage"
                    placeholder="Grau Importância"
                    type="number"
                    value={grauImportancia}
                    onChange={(e)=> setGrauImportancia(e.target.value)}/>

                    <input
                    type="submit"
                    className="inputInsertPage"
                    value="Cadastrar" />
            </div>
            <div className="orgCards mt-4">
                <div className="ccdDivCard mb-3">
                        <div className="ccdTitle">
                        <span className="ccdTitleName">Agua</span>
                        <span className="ccdTitleCircle"></span>
                        </div>
                        <div className="ccdBody">
                            <div className="ccdBodyIntem">
                                <b>Valor</b>
                                <span>R$ 55,90</span>
                            </div>
                            <div className="ccdBodyIntem">
                                <b>Vencimento dia</b>
                                <span>24</span>
                            </div>
                        </div>
                </div>
            </div>
            <CardBillRegisted nome="aa" valor="22" grauImp="3"/>
        </div>
    )
}