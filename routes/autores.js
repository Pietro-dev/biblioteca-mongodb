const router = require('express').Router()

// const autorController = require('../controllers/autorController')

// Rotas
router.route('/autores').post((req, res) => {
    autorController.create(req, res)
})
router.route('/autores').get((req, res) => {
    autorController.getAll(req, res)
})
router.route('/autores/:id').get((req, res) => {
    autorController.get(req, res)
})
router.route('/autores/:id').delete((req,res) => {
    autorController.delete(req, res)
})
router.route('/autores/:id').put((req, res) => {
    autorController.update(req, res)
})

module.exports = router