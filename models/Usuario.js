const mongoose = require('mongoose')

const { Schema } = mongoose

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    reservas: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    multas: {
        type: []
    }
}, /*{timestamps: true}*/)

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = {
    Usuario, 
    usuarioSchema
}