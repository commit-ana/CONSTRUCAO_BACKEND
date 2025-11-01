const yup = require('yup');

const schema = yup.object().shape(
    {
        nome: yup.string().required("O nome é obrigatório"),
        descricao: yup.string().required("A descrição é obrigatória"),
        salario: yup.number().required("'O salário é obrigatório")
        .min(1518.00,'O salário deve ser no mínimo R$ 1518,00')
    }
)      

async function validarCargo(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next()
    } catch (error) {
    return res.status(400).json({ errors: error.errors });
    }
}

module.exports = {validarCargo};