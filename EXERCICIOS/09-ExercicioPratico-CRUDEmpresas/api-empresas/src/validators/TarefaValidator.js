const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
    {
    titulo: yup.string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres')
    .required('O título é obrigatório'),
    descricao: yup.string()
    .min(10, 'A descrição deve ter no mínimo 10 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres')
    .required('A descrição é obrigatória'),
    prazo: yup.date()
    .required('O prazo é obrigatório')
    .min(new Date(), 'O prazo deve ser uma data futura'),
    concluida: yup.boolean()
    .required('O campo concluída é obrigatório'),
    projetoId: yup.string()
    .required('O ID do projeto é obrigatório')
    .test('is-objectid', 'ID do projeto inválido', value => mongoose.Types.ObjectId.isValid(value))
    }
)

async function validarTarefa(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
       return res.status(400).json({ error: error.errors })
    }
}

module.exports = { validarTarefa }