const express = require('express')
const router = express.Router()

const FuncionarioModel = require('../models/FuncionarioModel')
const { validarFuncionario } = require('../validators/FuncionarioValidator');
const { validarID } = require('../validators/IDValidator');

//Rotas
//Método GET - Listar todos os funcionários
router.get('/funcionarios', async (req, res, next) => {
    const funcionarios = await FuncionarioModel.find().pupulate('cargo', 'departamento')
    res.json(funcionarios)
});

//Método GET - Listar um funcionário pelo ID
router.get('/funcionarios/:id', validarID, async (req, res, next) => {
    const funcionarioEncontrado = await FuncionarioModel.findById(req.params.id).pupulate('cargo', 'departamento')
    if (!funcionarioEncontrado) {
        return res.status(404).json({ error: 'Funcionário não encontrado' })
    }
    res.json(funcionarioEncontrado)
});

//Método POST - Criar um novo funcionário
router.post('/funcionarios', validarFuncionario, async (req, res, next) => {
    const funcionarioCriado = await FuncionarioModel.create(req.body)
    res.status(201).json(funcionarioCriado)
});

//Método PUT - Atualizar um funcionário pelo ID
router.put('/funcionarios/:id', validarID, validarFuncionario, async (req, res, next) => {
    const id = req.params.id
    const dados = req.body
    const funcionarioAtualizado = await FuncionarioModel.findByIdAndUpdate(id, dados, { new: true })
if (!funcionarioAtualizado) {
        return res.status(404).json({ error: 'Funcionário não encontrado' })
    }
    res.json(funcionarioAtualizado)
})

//Método DELETE - Deletar um funcionário pelo ID
router.delete('/funcionarios/:id', validarID, async (req, res, next) => {
    await FuncionarioModel.findByIdAndDelete(req.params.id)
    res.status(204).send("Funcionário deletado com sucesso")
})

module.exports = router