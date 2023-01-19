const CarroService = require('../services/CarroService');

module.exports = {
    buscarTodos: async (req,res)=> {
        let json = {error:'', result:[]};

        let conta = await CarroService.buscarTodos();

        for(let i in conta){
            json.result.push({
                codigo: conta[i].codigo,
                nomeConta: conta[i].nomeConta,
                valor: conta[i].valor,
                obs: conta[i].obs,
                statusConta: conta[i].statusConta,
                vencimento: conta[i].vencimento
            });
        }
        res.json(json);
    },

    buscarUm: async(req,res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo;
        let carro = await CarroService.buscarUm(codigo);

        if(carro){
            json.result = carro;
        }

        res.json(json);
    },

    inserir: async(req,res) => {
        let json = {error:'', result:{}};

        let nomeConta = req.body.nomeConta;
        let valor = req.body.valor;
        let obs = req.body.obs;
        let statusConta = req.body.statusConta;
        let vencimento = req.body.vencimento;

        if(nomeConta && valor && obs && statusConta && vencimento){
            let CarroCodigo = await CarroService.inserir(nomeConta, valor, obs, statusConta, vencimento);
            json.result = {
                codigo: CarroCodigo,
                nomeConta,
                valor,
                obs,
                statusConta,
                vencimento
            };
        }else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async(req,res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo;
        let nomeConta = req.body.nomeConta;
        let valor = req.body.valor;
        let obs = req.body.obs;
        let statusConta = req.body.statusConta;
        let vencimento = req.body.vencimento;

        if( codigo && nomeConta && valor && obs && statusConta && vencimento ){
            await CarroService.alterar(codigo, nomeConta, valor, obs, statusConta, vencimento);
            json.result = {
                codigo,
                nomeConta,
                valor,
                obs,
                statusConta,
                vencimento
            };
        }else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async(req,res) => {
        let json = {error:'', result:{}};

        await CarroService.excluir(req.params.codigo);

        res.json(json);
    }

}