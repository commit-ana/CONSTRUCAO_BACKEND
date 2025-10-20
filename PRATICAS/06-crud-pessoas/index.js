// Crio minha aplicação express
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
const PessoaModel = mongoose.model('Pessoas', new mongoose.Schema(
{
    nome: String,
    idade: Number,
    dataCriacao: { type: Date, default: Date.now()}
}
))
    
//CRUD - Create, Read, Update, Delete
// CREATE - POST
app.post('/pessoas', async (req, res, next) => {
  const pessoa = req.body
 if (!pessoa.nome || !pessoa.idade) {
    return res.status(400).json({ erro: 'Nome e Idade são obrigatórios!' })
  }
  const pessoaCriada = await PessoaModel.create(pessoa)
  res.status(201).json(pessoaCriada)

})

//READ - GET
app.get('/pessoas', async (req, res, next) => {
  const pessoas = await PessoaModel.find()
  res.json(pessoas)
})

//UPDATE - PUT
app.put('/pessoas/:id', async (req, res, next) => {
  const id = req.params.id
  const pessoa = req.body

  if (!pessoa.nome || !pessoa.idade) {
    return res.status(400).json({erro: 'Nome e Idade são obrigatórios!'})
  }

  const pessoaAtualizada = await PessoaModel.findByIdAndUpdate(id, pessoa, {new: true})

  if (!pessoaAtualizada) {
    return res.status(404).json({erro: 'Pessoa não encontrada!'})
  }

  res.json(pessoaAtualizada)
})

//DELETE - DELETE
app.delete('/pessoas/:id', async (req, res, next) => {
  const id = req.params.id

  const pessoaDeletada = await PessoaModel.findByIdAndDelete(id)

  if (!pessoaDeletada) {
    return res.status(404).json({erro: 'Pessoa não encontrada!'})
  }

  res.json({ mensagem: 'Pessoa deletada com sucesso!' })
})




app.listen(3000, () => {
  console.log('Aplicação rodando em: http://localhost:3000');
})