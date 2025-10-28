const express = require('express');
const router = express.Router();

//Importo o modelo
const LivrosModel = require ('../models/livro');

//Importo os validadores
const { validarNovoLivro, validarAtualizacaoLivro } = require ('../validators/livroValidator');
const { validarID } = require ('../validators/IDValidator');

//Rotas
//Cadastro
router.post('/livros', validarNovoLivro, async (req, res, next) => {
    const dados = req.body;
    const livroCadastrado = await LivrosModel.create(dados)
    res.status(201).json(livroCadastrado)
});

//Leitura
router.get('/livros', async (req, res, next) => {
    const livros = await LivrosModel.find();
    res.json(livros);
});

//Leitura por ID
router .get('/livros/:id', validarID, async (req, res, next) => {
 const livroEncontrado = await LivrosModel.findById(req.params.id);
    if(!livroEncontrado) {
        return res.status(404).json({erro: 'Livro não encontrado'});
    }
    res.status(200).json(livroEncontrado);
});

//Atualização
router.put('/livros/:id', validarID, validarAtualizacaoLivro, async (req, res, next) => {
    const id = req.params.id
    const novosDados = req.body
    const livroAtualizado = await LivrosModel.findByIdAndUpdate(id, novosDados, {new : true}); 
    if(!livroAtualizado) {
        return res.status(404).json({erro: 'Livro não encontrado!'});
    }
    res.json(livroAtualizado)
});

//Exclusão
router.delete('/livros/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    await LivrosModel.findByIdAndDelete(id);
    res.status(204).json({mensagem: 'Livro excluído com sucesso!'});
})

//IMPORTANDO O MÓDULO
module.exports = router;