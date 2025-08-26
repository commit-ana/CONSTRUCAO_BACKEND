function somar (a,b) {
    return a + b;
}
function subtrair (a, b) {
    return a - b;
}
function dividir (a, b) {
    return a / b;
}
function multiplicar (a, b){
    return a * b;
}
function potencia (a, b){
    return a ** b;
}
function raizQuadrada (a, b){
    if (a <= 0){
        return "Erro, tente novamente!"
    }
    return Math.sqrt(a);
}

module.exports = {
somar,
subtrair,
dividir,
multiplicar,
potencia,
raizQuadrada
};