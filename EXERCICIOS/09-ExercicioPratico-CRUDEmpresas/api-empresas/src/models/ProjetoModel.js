const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    dataInicio: { type: String, required: true },
    dataTermino: { type: String, required: true },
}, { timestamps: true });

const ProjetoModel = mongoose.model('Projetos', Schema)
module.exports = ProjetoModel;