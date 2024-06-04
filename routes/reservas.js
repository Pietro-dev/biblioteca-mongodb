const router = require('express').Router()

const reservaController = require('../controllers/reservaController')

// Rotas
router.route('/reservas').post((req, res) => {
    reservaController.create(req, res)
})

router.route('/reservas').get((req, res) => {
    reservaController.getAll(req, res)
})

router.route('/reservas/:id').get((req, res) => {
    reservaController.get(req, res)
})

router.route('/reservas/:id').put((req, res) => {
    reservaController.update(req, res)
})

router.route('/reservas/:id').delete((req, res) => {
    reservaController.delete(req, res)
})
router.route('/reservas/:id/devolucao').put((req, res) => {
    reservaController.devolver(req, res)
})

module.exports = router