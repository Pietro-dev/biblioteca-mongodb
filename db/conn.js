const mongoose = require('mongoose')

async function main(){
    try {
        await mongoose.connect('mongodb+srv://pietromartins:biblioteca1234@clusterbiblioteca.pd797qq.mongodb.net/biblioteca?retryWrites=true&w=majority&appName=clusterBiblioteca')
        console.log('Conectado ao banco!')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main