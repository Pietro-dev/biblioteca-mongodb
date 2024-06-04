const { Livro: LivroModel } = require('../models/Livro')

const livroController = {

    create: async (req, res) => {
        try {
            const autores = req.body.autores
            const livro = {
                titulo: req.body.titulo,
                paginas: req.body.paginas,
                ano_publicacao: req.body.ano_publicacao,
                autores: autores
                // exemplares_disponiveis: req.body.exemplares_disponiveis,
            }

            const resposta = await LivroModel.create(livro)

            res.status(201).json({ resposta, msg: 'Livro cadastrado com sucesso!' })
        } catch (error) {
            console.log(error)
        }
    },

    getAll: async(req, res) => {
        try {
            const livros = await LivroModel.find()
            res.json(livros)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Erro ao buscar os livros' })
        }
    },

    getByAuthor: async(req,res) => {
        try {
            const autor = req.params.autor

            // pesquisar livro por autor
            const livros = await LivroModel.find({
                "autores.nome": autor
            })
            if(livros.length===0){
                res.status(404).json({msg: 'Não há livros deste autor cadastrados'})
            }
            res.status(200).json({ livros })
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Erro ao buscar os livros deste autor'})
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id
            const livro = await LivroModel.findById(id)

            if (!livro) {
                res.status(404).json({ msg: 'Livro não encontrado!' })
                return
            }

            res.json(livro)
        } catch (error) {
            console.error('Erro ao buscar livro:', error)
            res.status(500).json({ msg: 'Erro ao buscar o livro' })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const livro = await LivroModel.findById(id)

            if (!livro) {
                res.status(404).json({ msg: 'Livro não encontrado.' })
                return
            }

            const livro_deletado = await LivroModel.findByIdAndDelete(id)

            res.status(200).json({ livro_deletado, msg: 'Livro excluído com sucesso!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao excluir o livro' })
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id
            const livro = {
                titulo: req.body.titulo,
                paginas: req.body.paginas,
                ano_publicacao: req.body.ano_publicacao,
                // exemplares_disponiveis: req.body.exemplares_disponiveis,
                autores: req.body.autores
            }
            const livro_atualizado = await LivroModel.findByIdAndUpdate(id, livro, { new: true })
            if (!livro_atualizado) {
                res.status(404).json({ msg: 'Livro não encontrado' })
                return
            }

            res.status(200).json({ livro_atualizado, msg: 'Livro atualizado com sucesso!' })
        } catch (error) {
            console.error('Erro ao atualizar livro:', error)
            res.status(500).json({ msg: 'Erro ao atualizar o livro' })
        }
    }
}

module.exports = livroController