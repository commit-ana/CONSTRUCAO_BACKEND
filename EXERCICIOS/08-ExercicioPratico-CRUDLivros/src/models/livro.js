const mongoose = require('mongoose');
//schema do livro

const LivroSchema = new mongoose.Schema(
    //estrutura do registro
    {
        titulo: { type: String, required: true },
        autor: { type: String, required: true },
        editora: { type: String, required: true },
        ano: { type: Number, required: true },
        preco: { type: Number, required: true },
          
    },
    //parametros
    {
        timestamps: true
    }
)

//modelo
const LivrosModel = mongoose.model('Livro', LivroSchema);

//exportar o modelo
module.exports = LivrosModel;