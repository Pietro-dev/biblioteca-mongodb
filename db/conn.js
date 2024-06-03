const mongoose = require('mongoose')

async function main(){
    try {
        await mongoose.connect('mongodb://localhost/biblioteca')
        console.log('Conectado ao banco!')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main