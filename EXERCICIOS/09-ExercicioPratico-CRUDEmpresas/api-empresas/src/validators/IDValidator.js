const mongoose = require('mongoose');

//Criar um middleware para validar seo ID está no formato que o Mongo espera
function validarID (req, res, next) {
    const id = req.params.id
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido) {
        return res.status(400).json({erro: 'ID inválido'})
    }
    next()
}

//Exportar o middleware
module.exports = { 
    validarID 
};