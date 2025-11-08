const express = require('express');
const router = express.Router();

const CargoModel = require('../models/CargoModel');
const { validarCargo } = require('../validators/CargoValidator');
const { validarID } = require('../validators/IDValidator');

//Rotas
//Método GET - Listar todos os cargos
router.get('/cargos', async (req, res, next) => {
    const cargos = await CargoModel.find()
    res.json(cargos)
});

//Método GET - Listar um cargo pelo ID
router.get('/cargos/:id', validarID, async (req, res, next) => {
    const cargoEncontrado = await CargoModel.findById(req.params.id)
    if (!cargoEncontrado) {
        return res.status(404).json({ error: 'Cargo não encontrado' })
    }
    res.json(cargo)
});

//Método POST - Criar um novo cargo
router.post('/cargos', validarCargo, async (req, res, next) => {
    const cargoCriado = await CargoModel.create(req.body)
    res.status(201).json(cargoCriado)
});

//Método PUT - Atualizar um cargo pelo ID
router.put('/cargos/:id', validarID, validarCargo, async (req, res, next) => {
    const id = req.params.id
    const cargoAtualizado = await CargoModel.findByIdAndUpdate(id, req.body, { new: true })
    if (!cargoAtualizado) {
        return res.status(404).json({ error: 'Cargo não encontrado' })
    }
    res.json(cargoAtualizado)
})

//Método DELETE - Deletar um cargo pelo ID
router.delete('/cargos/:id', validarID, async (req, res, next) => {
    const cargoDeletado = await CargoModel.findByIdAndDelete(req.params.id)
    res.status(204).send("Cargo deletado com sucesso")
})

module.exports = router