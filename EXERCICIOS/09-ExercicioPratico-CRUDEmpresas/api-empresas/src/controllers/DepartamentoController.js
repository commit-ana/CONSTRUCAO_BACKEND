const express = require('express')
const router = express.Router()

const DepartamentoModel = require('../models/DepartamentoModel')
const { validarDepartamento } = require('../validators/DepartamentoValidator');
const { validarID } = require('../validators/IDValidator');

//Rotas
//Método GET - Listar todos os departamentos
router.get('/departamentos', async (req, res, next) => {
    const departamentos = await DepartamentoModel.find()
    res.json(departamentos)
});

//Método GET - Listar um departamento pelo ID
router.get('/departamentos/:id', validarID, async (req, res, next) => {
    const departamentoEncontrado = await DepartamentoModel.findById(req.params.id)
    if (!departamentoEncontrado) {
        return res.status(404).json({ error: 'Departamento não encontrado' })
    }
    res.json(departamentoEncontrado)
});

//Método POST - Criar um novo departamento
router.post('/departamentos', validarDepartamento, async (req, res, next) => {
    const departamentoCriado = await DepartamentoModel.create(req.body)
    res.status(201).json(departamentoCriado)
});

//Método PUT - Atualizar um departamento pelo ID
router.put('/departamentos/:id', validarID, validarDepartamento, async (req, res, next) => {
    const id = req.params.id
    const dados = req.body
    const departamentoAtualizado = await DepartamentoModel.findByIdAndUpdate(id, dados, { new: true })
if(!departamentoAtualizado){
    return res.status(404).json({ error: 'Departamento não encontrado' })
}
    res.json(departamentoAtualizado)
})

//Método DELETE - Deletar um departamento pelo ID
router.delete('/departamentos/:id', validarID, async (req, res, next) => {
    const departamentoDeletado = await DepartamentoModel.findByIdAndDelete(req.params.id)
    res.status(204).send("Departamento deletado com sucesso!")
})

module.exports = router