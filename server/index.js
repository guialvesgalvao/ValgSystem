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

app.get("/", (req,res) =>{

    let SQL = "SELECT * from conta";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.get("/contas", (req,res) =>{

    let SQL = "SELECT * from conta";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put("/edit", (req,res) =>{
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";

    db.query(SQL, [name, cost, category, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.delete("/delete/:id", (req,res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM games WHERE idgames = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
})/

app.listen(3001, ()=>{
    console.log("rodando servidor")
})