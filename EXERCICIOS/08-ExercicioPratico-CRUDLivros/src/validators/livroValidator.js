const yup = require('yup');

//schema de validação

//Validar Novo Livro
const schemaNovoLivro = yup.object().shape(
    {
        titulo: yup.string()
        .min(4, 'O título deve ter no mínimo 4 caracteres')
        .max(80, 'nome deve ter no máximo 100 caracteres')
        .required("O titulo é obrigatório"),
        autor: yup.string()
        .min(10, 'O nome deve ter no mínimo 11 caracteres')
        .required("Nome do autor é obrigatório!"),
        editora: yup.string()
        .min(4, 'Editora deve ter no mínimo 4 caracteres')
        .max(50, 'Editora deve ter no máximo 50 caracteres')
        .required("Nome da editora é obrigatório!"),
        ano: yup
        .number()
        .positive("O ano deve ser um número positivo.")
        .typeError("O ano deve ser um número.")
        .required("O ano é obrigatório."),
        preco: yup
        .number()
        .typeError("O preço deve ser um número.")
        .positive("O preço deve ser um número positivo.")
        .required("O preço é obrigatório."),
    }
)
// Validação para atualizar (campos opcionais)
const schemaAtualizar = yup.object().shape(
    {
        titulo: yup.string()
        .min(4, 'O título deve ter no mínimo 4 caracteres')
        .max(80, 'nome deve ter no máximo 100 caracteres'),
        autor: yup.string()
        .min(10, 'O nome deve ter no mínimo 11 caracteres'),
        editora: yup.string()
        .min(4, 'Editora deve ter no mínimo 4 caracteres')
        .max(50, 'Editora deve ter no máximo 50 caracteres'),
        ano: yup
        .number()
        .positive("O ano deve ser um número positivo.")
        .typeError("O ano deve ser um número."),
        preco: yup
        .number()
        .typeError("O preço deve ser um número.")
        .positive("O preço deve ser um número positivo."),
    }
);

//Middleware de validação
//Criação
async function validarNovoLivro (req, res, next) {
    try {
        await schemaNovoLivro.validate(req.body, { abortEarly: false});
        next();
    } catch (error) {
        return res.status(400).json({ erros: error.errors });
    }
}
//Atualização
async function validarAtualizacaoLivro (req, res, next) {
    try {
        await schemaAtualizar.validate(req.body, { abortEarly: false});
        next();
    } catch (error) {
        return res.status(400).json({ erros: error.errors });
    }
}

//Exportar o middleware para usar no Controller
module.exports = {
    validarNovoLivro,
    validarAtualizacaoLivro
}