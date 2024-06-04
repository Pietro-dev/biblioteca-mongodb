const mongoose = require('mongoose')

const { Schema } = mongoose

const reservaSchema = new Schema({
    livroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro',
        required: true
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    data_reserva: {
        type: Date,
        default: Date.now
    },
    data_devolucao_prevista: {
        type: Date
    },
    data_devolucao_real: {
        type: Date
    },
    status: {
        type: String,
        default: "Emprestado"
    }
}, /*{timestamps: true}*/)

const Reserva = mongoose.model('Reserva', reservaSchema)

module.exports = {
    Reserva,
    reservaSchema
}