const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, required: true },
    prazo: { type: String, required: true },
    responsavel: { type:
        mongoose.Schema.Types.ObjectId, ref: 'Funcionarios', required: true },
        projeto: { type:
        mongoose.Schema.Types.ObjectId, ref: 'Projetos', required: true },
}, { timestamps: true });

const TarefaModel = mongoose.model('Tarefas', Schema);
module.exports = TarefaModel;
