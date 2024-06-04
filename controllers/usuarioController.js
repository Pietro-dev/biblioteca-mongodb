const { Usuario: UsuarioModel } = require('../models/Usuario')

const usuarioController = {
    create: async(req, res) => {
        try {
            const usuario = {
                nome: req.body.nome,
                senha: req.body.senha,
                reservas: req.body.reservas
            }

            const resposta = await UsuarioModel.create(usuario)

            res.status(201).json({ resposta, msg: 'Usuário criado com sucesso!' })
        } catch (error) {
            console.log(error)
        }
    },

    getAll: async (req, res) => {
        try {
            const usuarios = await UsuarioModel.find();
            res.json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuarios:', error);
            res.status(500).json({ msg: 'Erro ao buscar os usuarios' });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await UsuarioModel.findById(id);

            if (!usuario) {
                res.status(404).json({ msg: 'Usuario não encontrado!' });
                return;
            }

            res.json(usuario);
        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            res.status(500).json({ msg: 'Erro ao buscar o usuario' });
        }
    },
    
    delete: async(req, res) => {
        try {
            const id = req.params.id
            const usuario = await UsuarioModel.findById(id)

            if(!usuario){
                res.status(404).json({ msg: 'Usuário não encontrado'})
                return
            }

            const usuario_deletado = await UsuarioModel.findByIdAndDelete(id)

            res.status(200).json({ usuario_deletado, msg: 'usuario deletado com sucesso!'})
        } catch (error) {
            res.status(500).json({error, msg: 'Erro ao excluir o usuario'})
        }
        
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = {
                nome: req.body.nome,
                senha: req.body.senha
            }
            const usuario_atualizado = await UsuarioModel.findByIdAndUpdate(id, usuario, { new: true });
            if (!usuario_atualizado) {
                res.status(404).json({ msg: 'usuario não encontrado' });
                return;
            }

            res.status(200).json({ usuario_atualizado, msg: 'usuario atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error, msg: 'Erro ao atualizar o usuario' });
        }
    },
}

module.exports = usuarioController