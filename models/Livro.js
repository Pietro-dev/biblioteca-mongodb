const mongoose = require('mongoose')

const { Schema } = mongoose

const livroSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    ano_publicacao: {
        type: Number,
        required: true
    },
    // exemplares_disponiveis: {
    //     type: Number,
    //     required: true
    // },
    autores: {
        type: []
    }
}, /*{timestamps: true}*/)

const Livro = mongoose.model('Livro', livroSchema)

module.exports = {
    Livro, 
    livroSchema
}

