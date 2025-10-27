const express = require('express');
const router = express.Router();

//Importo o modelo
const LivroModel = require ('../models/LivroModel');

//Importo os validadores
const { validarNovoLivro } = require ('..validators/livroValidator');
const { validarID } = require ('../validators/IDValidator');

//Rotas
//Cadastro
router.post('/livros', validarNovoLivro, async (req, res, next) => {
    const dados = req.body;
    const livroCadastrado = await LivroModel.create(dados)
    res.status(201).json(livroCadastrado)
});

//Leitura
router.get('/livros', async (req, res, next) => {
    const livros = await LivroModel.find();
});

router .get('/livros/:id', validarID, async (req, res, next) => {
 const livroEncontrado = await LivroModel.findById(req.params.id);
    if(!livroEncontrado) {
        return res.status(404).json({erro: 'Livro não encontrado'});
    }
    res.status(200).json(livroEncontrado);
});

//Atualização
router.put('/livros/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    const novosDados = req.body
    const livroAtualizado = await LivroModel.findByIdAndUpdate(id, novosDados, {new : true}); 
    if(!livroAtualizado) {
        return res.status(404).json({erro: 'Livro não encontrado!'});
    }
    res.json(livroAtualizado)
});

//Exclusão
router.delete('/livros/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    await LivroModel.findByIdAndDelete(id);
    res.status(204).send();
})

//IMPORTANDO O MÓDULO
module.exports = router;