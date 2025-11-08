const yup = require('yup')

const schema = yup.object().shape(
    {
    nome: yup.string().required('O nome do projeto é obrigatório')
    .min(3, 'O nome do projeto deve ter pelo menos 3 caracteres'),
    descricao: yup.string().required('A descrição do projeto é obrigatória')
    .min(10, 'A descrição do projeto deve ter pelo menos 10 caracteres'),
    dataInicio: yup.date()
    .required('A data de início do projeto é obrigatória'),
    dataFim: yup.date()
    .min(
    yup.ref('dataInicio'),
    'A data de fim do projeto deve ser posterior à data de início'
    ),
    status: yup.string().required('O status do projeto é obrigatório')
    .oneOf(['planejado', 'em andamento', 'concluído'], 'Status inválido')
})

async function validarProjeto (req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ error: erros.errors })
    }
}

module.exports = { validarProjeto }
