const router = require('express').Router()
const livroController = require('../controllers/livroController')

// Rotas
router.route('/livros').post((req, res) => {
    livroController.create(req, res)
})

router.route('/livros').get((req, res) => {
    livroController.getAll(req, res)
})

router.route('/livros/:id').get((req, res) => {
    livroController.get(req, res)
})

router.route('/livros/:id').delete((req, res) => {
    livroController.delete(req, res)
})

router.route('/livros/:id').put((req, res) => {
    livroController.update(req, res)
})

router.route('/livros/por-autor/:autor').get((req, res) => {
    livroController.getByAuthor(req, res)
})

module.exports = router