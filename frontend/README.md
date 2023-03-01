Para rodar o servidor, acesse ' cd server ' -> e rode no terminal ' yarn dev '

Para rodar o client, acesse ' cd frontend ' -> e rode no terminal ' npm run dev '

Relações de intens do Banco de dados:

 - Conta:
nomeConta: Nome
valor: valor
obs: observação
vencimento: data de vencimento
statusConta: Pago ou Não pago
grauImportancia: 1 grave 2 médio 3 baixo
codigoRelacional: código opcional para relacionar 1 conta com demais contas
codigoMensal: é settada uma data de ínicio do sistema e apartir daí todos os meses seguintes começam a ser relacionados por número, exemplo: 1 -> fevereiro/23 2-> março/23

código mesal:
01/23 -> 0
02/23 -> 1;
03/23 -> 2;
04/23 -> 3;
05/23 -> 4;
06/23 -> 5;
07/23 -> 6;

código relacional para registro de contas:

Flávio = 0;
Vivo = 1;
Água = 2;
Energia = 3; 
Ana Paula = 4;
Célia = 5;
Nil = 6;
Gean e Tinoco = 7;

