const express = require('express');
const router = express.Router();

//Importo o modelo
const PessoaModel = require ('../models/PessoaModel');

//Importo os validadores
const { validarNovaPessoa } = require ('../validators/pessoaValidator');
const { validarID } = require ('../validators/IDValidator');

//Rotas
//Cadastro
router.post('/pessoas', validarNovaPessoa, async (req, res, next) => {
    const dados = req.body;
    const pessoaCadastrada = await PessoaModel.create(dados)
    res.status(201).json(pessoaCadastrada)
});

//Leitura
router.get('/pessoas', async (req, res, next) => {
    const pessoas = await PessoaModel.find();
});

router .get('/pessoas/:id', async (req, res, next) => {
 const pessoaEncontrada = await PessoaModel.findById(req.params.id);
    if(!pessoaEncontrada) {
        return res.status(404).json({erro: 'Pessoa não encontrada'});
    }
    res.status(200).json(pessoaEncontrada);
});

//Atualização
router.put('/pessoas/:id', async (req, res, next) => {
    const id = req.params.id
    const novosDados = req.body
    const pessoaAtualizada = await PessoaModel.findByIdAndUpdate(id, novosDados, {new : true}); 
    if(!pessoaAtualizada) {
        return res.status(404).json({erro: 'Pessoa não encontrada'});
    }
    res.json(pessoaAtualizada)
});

//Exclusão
router.delete('/pessoas/:id', async (req, res, next) => {
    const id = req.params.id
    await PessoaModel.findByIdAndDelete(id);
    res.status(204).send();
})

//IMPORTANDO O MÓDULO
module.exports = router;