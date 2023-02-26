const db = require('../db');

module.exports={
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM conta', (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        });
    },

    buscarUm: (codigo) => {
        return new Promise((aceito,rejeitado)=>{

            db.query('SELECT * FROM conta WHERE codigo = ?', [codigo], (error, results)=>{
                if(error) { rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },

    inserir: (nomeConta, valor, obs, statusConta, vencimento) => {
        return new Promise((aceito,rejeitado)=>{

            db.query('INSERT INTO conta (nomeConta, valor, obs, statusConta, vencimento) VALUES (?, ?, ?, ?, ?)',
             [nomeConta, valor, obs, statusConta, vencimento],
             (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results.insertId);
                }
            );
            });
    },

    alterar: (codigo, nomeConta, valor, obs, statusConta, vencimento) => {
        return new Promise((aceito,rejeitado)=>{

            db.query('UPDATE conta SET nomeConta = ?, valor = ?, obs = ?, statusConta = ?, vencimento = ?  WHERE codigo = ?',
             [nomeConta, valor, obs, statusConta, vencimento, codigo],
             (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
                }
            );
            });
    },

    excluir: (codigo) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM conta WHERE codigo = ?', [codigo], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        });
    },
};