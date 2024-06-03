const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController')

// Rotas
router.route('/usuarios').post((req, res) => {
    usuarioController.create(req, res)
})
router.route('/usuarios').get((req, res) => {
    usuarioController.getAll(req, res)
})
router.route('/usuarios/:id').get((req, res) => {
    usuarioController.get(req, res)
})
router.route('/usuarios/:id').delete((req, res) => {
    usuarioController.delete(req, res)
})
router.route('/usuarios/:id').put((req, res) => {
    usuarioController.update(req, res)
})

module.exports = router