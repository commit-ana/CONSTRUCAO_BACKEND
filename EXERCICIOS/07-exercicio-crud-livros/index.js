//Criando minha aplicação express
const express = require('express')
const app = express()

app.use(express.json())

// Conectar no MONGODB
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

// MODEL - Interface com o meu banco de dados
// Cada model representa uma collection (Tabela)
const LivroModel = mongoose.model('Livros', new mongoose.Schema(
    {
        titulo: String,
        autor: String,
        editora: String,
        preco: Number,
        dataAno: Number
    }
))

//CRUD - Create, Read, Update, Delete
// CREATE - POST
app.post('/livros', async (req, res, next) => {
    const livros = req.body
   if (!livros.titulo || !livros.autor || !livros.editora || !livros.preco || !livros.dataAno) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' })
    }
    const livroCriado = await LivroModel.create(livros)
    res.status(201).json(livroCriado)
  
  })
  
  //READ - GET
  app.get('/livros/:id', async (req, res, next) => {
    const id = req.params.id
    const livro = await LivroModel.findById(id)
    res.json(livro)
  })
  
  //UPDATE - PUT
  app.put('/livros/:id', async (req, res, next) => {
    const id = req.params.id
    const livros = req.body
  
    if (!livros.titulo || !livros.autor || !livros.editora) {
      return res.status(400).json({erro: 'Titulo, autor e editora são obrigatórios!'})
    }
  
    const livroAtualizado = await LivroModel.findByIdAndUpdate(id, livros, {new: true})
  
    if (!livroAtualizado) {
      return res.status(404).json({erro: 'Livro não encontrado!'})
    }
  
    res.json(livroAtualizado)
  })
  
  //DELETE - DELETE
  app.delete('/livros/:id', async (req, res, next) => {
    const idlivro = req.params.id
  
    const livroDeletado = await LivroModel.findByIdAndDelete(idlivro)
  
    if (!livroDeletado) {
      return res.status(404).json({erro: 'Livro não encontrado!!'})
    }
  
    res.json({ mensagem: 'Livro deletado com sucesso!' })
  })
  

app.listen(3000, () => {
  console.log('Aplicação rodando em: http://localhost:3000');
})