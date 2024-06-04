const router = require('express').Router()

// Usuarios router
const usuariosRouter = require('./usuarios')
router.use('/', usuariosRouter)

// Livros router
const livrosRouter = require('./livros')
router.use('/', livrosRouter)

// Reservas router
const reservasRouter = require('./reservas')
router.use('/', reservasRouter)

module.exports = router