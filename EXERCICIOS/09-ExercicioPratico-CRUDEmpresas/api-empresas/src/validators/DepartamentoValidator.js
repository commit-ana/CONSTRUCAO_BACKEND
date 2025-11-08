const yup = require('yup')

const schema = yup.object().shape(
    {
    nome: yup.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres')
    .required('O nome é obrigatório'),
    descricao: yup.string()
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .max(250, 'A descrição deve ter no máximo 200 caracteres')
    .required('A descrição é obrigatória'),   
    }
)

async function validarDepartamento(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
       return res.status(400).json({ error: erros.errors })
    }
}

module.exports = { validarDepartamento }