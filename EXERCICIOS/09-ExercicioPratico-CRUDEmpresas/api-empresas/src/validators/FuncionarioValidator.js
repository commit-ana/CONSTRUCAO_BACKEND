const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
    {
        nome: yup.string().required('O nome é obrigatório'),
        cpf: yup.string().required('O CPF é obrigatório'),
        email: yup.string().email('Email inválido').required('O email é obrigatório'),
        telefone: yup.string().required('O telefone é obrigatório'),
        dataNascimento: yup.date().required('A data de nascimento é obrigatória'),
        dataContratacao: yup.date().required('A data de contratação é obrigatória'),
        genero: yup.string().required('O gênero é obrigatório'),
        endereco: yup.string().required('O endereço é obrigatório'),
        cargo: yup.string().required('O cargo é obrigatório')
        .test(
        'id-validator',
        'ID do cargo é inválido',
        value => mongoose.Types.ObjectId.isValid(value)
        ),
        departamento: yup.string().required('O departamento é obrigatório')
        .test(
        'id-validator',
        'ID do departamento é inválido',
        value => mongoose.Types.ObjectId.isValid(value)
        ),
    }
)

async function validarFuncionario(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
       return res.status(400).json({ error: error.errors })
    }
}

module.exports = { validarFuncionario }