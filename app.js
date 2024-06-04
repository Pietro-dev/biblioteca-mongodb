const express = require('express')
const cors = require('cors')
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// db connection
const connection = require('./db/conn')
connection()

// Rotas
const routes = require('./routes/router')
app.use('/api', routes)

// iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor Online!')
})