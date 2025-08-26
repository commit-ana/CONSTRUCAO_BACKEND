const PromptSync = require("prompt-sync")

console.log("Olá, seja bem vindo! Este é o exercício 01 - Calculadora-Node! Atenção: Ao usar a raiz quadrada, o seu número será o >num1<")

const calculadora = require('./calculadoraNode');

let num1 = 5;
let num2 = 3;
let operacao = "**";

let resultado;

if (operacao === "+"){
    resultado = calculadora.somar(num1, num2);
} else if (operacao === "-"){
    resultado = calculadora.subtrair(num1, num2)
} else if (operacao === "/"){
    resultado = calculadora.dividir(num1, num2)
} else if (operacao === "*") { 
    resultado = calculadora.multiplicar(num1, num2)
} else if (operacao === "**") {
    resultado = calculadora.potencia (num1, num2)
} else if (operacao === "√") { 
    resultado = calculadora.raizQuadrada(num1, num2)
} else {
    resultado = "Inválido!"
}

console.log("O resultado da sua operação é: ", resultado);