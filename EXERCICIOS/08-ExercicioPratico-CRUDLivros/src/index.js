const express = require('express');
const app = express();

app.use(express.json());

//Conexão com o banco de dados (MONGODB)
const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=ClusterDb1`

mongoose.connect(url)
 .then( () => {
    console.log('Conectado ao MongoDB com sucesso!')
  })

 .catch(erro => {
    console.log('Erro ao conectar no MongoDB: ', erro)
  })

//Rotas
const LivroController = require ('./controllers/LivroController')
app.use(LivroController);

//Verificação de servidor rodando
app.listen(3000, () => {
    console.log('Aplicação rodando em http://localhost:3000');
});