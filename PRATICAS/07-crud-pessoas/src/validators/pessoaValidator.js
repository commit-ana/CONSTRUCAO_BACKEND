const yup = require('yup');

//schema de validação
const schemaNovaPessoa = yup.object().shape(
    {
        nome: yup.string()
        .min(5, 'nome deve ter no mínimo 5 caracteres')
        .max(50, 'nome deve ter no máximo 100 caracteres')
        .required("campo nome é obrigatório"),
        cpf: yup.string()
        .length(11, 'CPF deve ter exatamente 11 caracteres')
        .matches(/[0-9]/, 'CPF deve conter apenas números')
        .required("CPF é obrigatório"),
        email: yup.string().email('email inválido').required("campo email é obrigatório"),
        dataNascimento: yup.date().required("campo data de nascimento é obrigatório"),
        telefone: yup.string().required("campo telefone é obrigatório"),
        genero: yup.string().required("campo gênero é obrigatório"),
    }
)

//Middleware de validação
async function validarNovaPessoa (req, res, next) {
    try {
        await schemaNovaPessoa.validate(req.body, { abortEarly: false});
        next();
    } catch (error) {
        return res.status(400).json({ erros: error.errors });
    }
}

//Exportar o middleware para usar no Controller
module.exports = {
    validarNovaPessoa
}