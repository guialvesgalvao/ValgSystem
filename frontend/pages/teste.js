export default function Teste () {

    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    var conectionDatabase = true;

    //  fetch to database for know if the bills were reseted
    //
    //       se a resposta do registro de contas for negativa, então faça isso: 

    if(conectionDatabase){ 
        //código MySQL para registrar todas as novas contas recorrentes na api com as datas necessárias
    }else if (lembreteJáfoiEnviado){ // se as contas do mês já foram registradas, então é necessário fazer uma checagem também se o lembrete já foi enviado, ele deve conter a informação sobre true/false e no caso se for false, deve ser enviado o lembrete

        enviarLembreteFunction();  // a função no caso deve receber um parâmetro que será a mensagem contida no react-tostify

    }// caso o lembrete seja (true) já enviado, então nada deve ser feito

    return(
        <div>
            <h1>Boa</h1>
        </div>
    )
}