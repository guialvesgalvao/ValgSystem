export default function RegisterBills () {
    return(
        //dados que deverá conter na conta:
        //Nome: Nome da Conta
        //Valor: Defina um valor fixo ou médio para a conta, qualquer maior importância, o usuário poderá alterar na aba de todas as contas
        //Dia do vencimento: servirá para definir qual dia a conta vence todo mês Day(fixo)/Month(Variável);
        //Obs: n precisa
        //Status da conta: virá por padrão como falso [NP (Não Pago)];
        //Grau importância: o usuário deverá ter uma opção de input para as seguintes alternativas: 1 - Grave 2 - Média 3 - Leve
        //Código Relacional: cada conta recorrente deverá conter um id único dela ( verificar bugs com o painel! )
        //Código Mensal: É settada uma data de ínicio do sistema e apartir daí todos os meses seguintes começam a ser relacionados por número, exemplo: 1 -> fevereiro/23 2-> março/23

        //Opções para funções de 'delete' mysql;
        
        <div>
            <h1>aqui deve conter um formulário fixo ao topo onde o usuário vai registrar suas contas recorrentes, ou seja, aquelas que todo mês ele sempre precisa pagar, então de forma autómatica o aplicativo registrará para ele</h1>
            <h2>aqui aparecerá todas as contas recorrentes que este usuário possuí, também deverá conter a opção de cancelar a recorrência de contas, a opção de editar a conta deverá ser opcional, então eu decidirei se vale a pena ou não implantar</h2>
        </div>
    )
}