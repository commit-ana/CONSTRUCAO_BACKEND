const PromptSync = require("prompt-sync")

console.log("Olá, este é o projeto 02 sobre a calculadora de notas!")

/*importo e executo o prompt-sync*/
let prompt = require('prompt-sync')()

let nome = prompt("Qual é o seu nome?")

/*pergunta para o usuário o nome dele, captura a resposta e armazena dentro da variável "nome"*/
console.log("Olá " + nome)

/*Cálculo da nota do IESB baseado no peso*/
let {calcularNotaA1, calcularNotaA2, calcularNotaFinal} = require('./CalculadoraNota')

/*Calculando Nota do A1*/
console.log("### Calculando Nota A1 ###")
let exercicioA1 = parseFloat(prompt("Digite sua nota de exercícios:"))
let trabalhoA1 = parseFloat(prompt("Digite sua nota de trabalho:"))
let provaA1 = parseFloat(prompt("Digite sua nota de prova:"))

let notaA1 = calcularNotaA1(exercicioA1, trabalhoA1, provaA1)
console.log("Nota A1 calculada: " + notaA1)
console.log("### Finalizado calculo Nota A1 ###")

/*Calculando Nota do A2*/
console.log("### Calculando Nota A2 ###")
let exercicioA2 = parseFloat(prompt("Digite sua nota de exercícios:"))
let trabalhoA2 = parseFloat(prompt("Digite sua nota de trabalho:"))
let provaA2 = parseFloat(prompt("Digite sua nota de prova:"))

let notaA2 = calcularNotaA2(exercicioA2, trabalhoA2, provaA2)
console.log("Nota A2 calculada: " + notaA2)
console.log("### Finalizado calculo Nota A2 ###")

/*Calculando Média Final*/
console.log("### Calculando Média Final ###")
let media = calcularNotaFinal(notaA1, notaA2)

console.log("Sua Média Final É: " + media)

if(media >= 5){
    console.log("Parabéns", nome, "você foi aprovado(a)!!!")
}else {
    console.log("Infelizmente", nome, "você foi reprovado(a) :(")
}