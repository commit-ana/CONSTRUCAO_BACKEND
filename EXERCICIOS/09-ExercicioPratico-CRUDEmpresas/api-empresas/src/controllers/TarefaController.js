const express = require('express')
const router = express.Router()

//Importando o modelo
const Tarefa = require('../models/TarefaModel')
const { validarTarefa } = require('../validators/TarefaValidator');
const { validarFuncionario } = require('../validators/FuncionarioValidator');
const { validarID } = require('../validators/IDValidator');

//Rotas
//Método GET - Listar todas as tarefas
router.get('/tarefas', async (req, res, next) => {
    const tarefas = await Tarefa.find()
    res.json(tarefas)
});

//Método GET - Listar uma tarefa pelo ID
router.get('/tarefas/:id', validarID, async (req, res, next) => {
    const tarefaEncontrada = await Tarefa.findById(req.params.id)
    if (!tarefaEncontrada) {
        return res.status(404).json({ error: 'Tarefa não encontrada' })
    }
    res.json(tarefaEncontrada)
});

//Método POST - Criar uma nova tarefa
router.post('/tarefas', validarTarefa, async (req, res, next) => {
    const tarefaCriada = await Tarefa.create(req.body)
    res.status(201).json(tarefaCriada)
});

//Método PUT - Atualizar uma tarefa pelo ID
router.put('/tarefas/:id', validarID, validarTarefa, async (req, res, next) => {
    const id = req.params.id
    const dados = req.body
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, dados, { new: true })
    if (!tarefaAtualizada) {
        return res.status(404).json({ error: 'Tarefa não encontrada' })
    }
    res.json(tarefaAtualizada)
});

//Método DELETE - Deletar uma tarefa pelo ID
router.delete('/tarefas/:id', validarID, async (req, res, next) => {
    await Tarefa.findByIdAndDelete(req.params.id)
    res.status(204).send("Tarefa deletada com sucesso")
})

module.exports = router

