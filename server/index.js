const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "gui12345",
    database: "contas"
});

app.use(cors());
app.use(express.json());

// ROTAS PARA CHECAR RESET DE CONTAS RECORRENTES // 

app.get("/checkmes/:mes", (req,res) => {
    const { mes } = req.params;
    let SQL = "SELECT * FROM mesesReset WHERE numMes = ?";

    db.query(SQL, [mes], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.put("/confirmarResetMes", (req,res) =>{
    const { mesNum } = req.body;

    let SQL = "UPDATE mesesReset SET resetado = true WHERE mesNum = ?;";

    db.query(SQL, [ mesNum ], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

// ROTAS PARA CONTROLE DE CADASTRO DE CONTAS RECORRENTES

app.get("/contasRecorrentes", (req,res) =>{

    let SQL = "SELECT * from contaRecorrente";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

 app.delete("/deleteRecorrente/:id", (req,res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM contaRecorrente WHERE codigo = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.post("/cadastrarContasRecorrentes", (req,res)=>{

    const { nomeConta } = req.body;
    const { valor } = req.body;
    const { obs } = req.body;
    const { statusConta } = req.body;
    const { vencimento } = req.body;
    const { grauImportancia } = req.body;
    const { codigoRelacional } = req.body;
    const { codigoMensal } = req.body;
 
    let SQL = "INSERT INTO contaRecorrente (nomeConta, valor, obs, statusConta, vencimento, grauImportancia, codigoRelacional, codigoMensal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(SQL, [nomeConta, valor, obs, statusConta, vencimento, grauImportancia, codigoRelacional, codigoMensal], (err,result) => {
     console.log(err);
    });
 });


// ROTAS PARA CONTROLE DO BANCO DE DADOS DE CONTAS // 

app.get("/", (req,res) =>{

    let SQL = "SELECT * from conta";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.post("/cadastrarContas", (req,res)=>{

   const { nomeConta } = req.body;
   const { valor } = req.body;
   const { obs } = req.body;
   const { statusConta } = req.body;
   const { vencimento } = req.body;
   const { grauImportancia } = req.body;
   const { codigoRelacional } = req.body;
   const { codigoMensal } = req.body;

   let SQL = "INSERT INTO conta (nomeConta, valor, obs, statusConta, vencimento, grauImportancia, codigoRelacional, codigoMensal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
   
   db.query(SQL, [nomeConta, valor, obs, statusConta, vencimento, grauImportancia, codigoRelacional, codigoMensal], (err,result) => {
    console.log(err);
   });
});

app.get("/contas", (req,res) =>{

    let SQL = "SELECT * from conta";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put("/pagar", (req,res) =>{
    const { id } = req.body;
    const statusConta = "P";

    let SQL = "UPDATE conta SET statusConta = ? WHERE codigo = ?";

    db.query(SQL, [statusConta, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.put("/editarContas", (req,res) =>{
    const { id } = req.body;
    const { nome } = req.body;
    const { valor } = req.body;
    const { obs } = req.body;
    const { statusConta } = req.body;
    const { vencimento } = req.body;

    let SQL = "UPDATE conta SET nomeConta = ?, valor = ?, obs = ?, statusConta = ?, vencimento = ? WHERE codigo = ?";

    db.query(SQL, [nome, valor, obs, statusConta, vencimento, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.delete("/delete/:id", (req,res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM conta WHERE codigo = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});


app.listen(3001, ()=>{
    console.log("rodando servidor")
})