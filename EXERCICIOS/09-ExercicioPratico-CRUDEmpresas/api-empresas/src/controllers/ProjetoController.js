const express = require('express')
const router = express.Router()

//Importando o modelo
const Projeto = require('../models/ProjetoModel')
const { validarProjeto } = require('../validators/ProjetoValidator');
const { validarID } = require('../validators/IDValidator');

//Rotas
//Método GET - Listar todos os projetos
router.get('/projetos', async (req, res, next) => {
    const projetos = await Projeto.find()
    res.json(projetos)
});

//Método GET - Listar um projeto pelo ID
router.get('/projetos/:id', validarID, async (req, res, next) => {
    const projetoEncontrado = await Projeto.findById(req.params.id)
    if (!projetoEncontrado) {
        return res.status(404).json({ error: 'Projeto não encontrado' })
    }
    res.json(projetoEncontrado)
});

//Método POST - Criar um novo projeto
router.post('/projetos', validarProjeto, async (req, res, next) => {
    const projetoCriado = await Projeto.create(req.body)
    res.status(201).json(projetoCriado)
});

//Método PUT - Atualizar um projeto pelo ID
router.put('/projetos/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    const dados = req.body
    const projetoAtualizado = await Projeto.findByIdAndUpdate(id, dados, { new: true })
    if (!projetoAtualizado) {
        return res.status(404).json({ error: 'Projeto não encontrado' })
    }
    res.json(projetoAtualizado)
})

//Método DELETE - Deletar um projeto pelo ID
router.delete('/projetos/:id', validarID, async (req, res, next) => {
    await Projeto.findByIdAndDelete(req.params.id)
    res.status(204).send("Projeto deletado com sucesso")
})

module.exports = router