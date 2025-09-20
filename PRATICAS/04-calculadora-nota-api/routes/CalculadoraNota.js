// importo o express
const express = require('express')
// crio um roteador
const router = express.Router()

// mapeamento da rotas e implementar a lógica
// criar uma rota para calcular a Nota1
router.get("/calculadora/NotaA1", (req, res, next) => {
    const exercicio = parseFloat(req.query.exercicio)
    const trabalho = parseFloat(req.query.trabalho)
    const prova = parseFloat(req.query.prova)
 
// valido se ele mandou os parâmetros e se estão dentro do intervalo
    if(isNaN(exercicio) || isNaN(trabalho) || isNaN(prova)){
        return res.status(400).json({erro: "Notas Inválidas!!!"})
    }
    if(
        exercicio < 0 || 
        exercicio > 1 || 
        trabalho < 0 ||
        trabalho > 3 ||
        prova < 0 ||
        prova > 6
    ) {
        return res.status(400).json({ erro: "Notas fora do intervalo !!!" })
    }

    const NotaA1 = exercicio + trabalho + prova

    res.json({ NotaA1 })
})
// criar uma rota para calcular a Nota2
router.get("/calculadora/NotaA1", (req, res, next) => {
    const exercicio = parseFloat(req.query.exercicio)
    const trabalho = parseFloat(req.query.trabalho)
    const prova = parseFloat(req.query.prova)
 
// valido se ele mandou os parâmetros e se estão dentro do intervalo
    if(isNaN(exercicio) || isNaN(trabalho) || isNaN(prova)){
        return res.status(400).json({erro: "Notas Inválidas!!!"})
    }
    if(
        exercicio < 0 || 
        exercicio > 1 || 
        trabalho < 0 ||
        trabalho > 3 ||
        prova < 0 ||
        prova > 6
    ) {
        return res.status(400).json({ erro: "Notas fora do intervalo !!!" })
    }

    const NotaA2 = exercicio + trabalho + prova

    res.json({ NotaA2 })
})
// criar uma rota para calcular a Média Final
router.get("/calculadora/media", (req, res, next) => {
    const notaA1 = parseFloat(req.query.notaA1)
    const notaA2 = parseFloat(req.query.notaA2)

    if(isNaN(notaA1) || isNaN(notaA2)){
  return res.status(400).json({ erro: "Notas Inválidas"})
 }

 if (notaA1 <0 || notaA1 >10 || notaA2 <0 || notaA2 >10){
    return res.status(400).json({ erro: "Notas fora do intervalo!!"})
 }

 const media = (notaA1 * 0.4) + (notaA2 * 0.6)
 res.json({media})


})











//exporto o roteador
module.exports = router