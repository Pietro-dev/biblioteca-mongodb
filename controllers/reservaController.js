const { Reserva: ReservaModel } = require('../models/Reserva')
const { Usuario } = require('../models/Usuario')
const { addDays, differenceInDays } = require('date-fns')

const reservaController = {
    create: async(req, res) => {
        try {
            // criando a data de reserva
            const dataReserva = new Date()
            // criando a data de devolução == data reserva + 7 dias
            const data_devolucao_prevista = addDays(dataReserva, 7)

            // buscando o usuário q fez a reserva
            const usuarioReserva = await Usuario.findById(req.body.usuarioId)
            
            // verificando a qntd de reservas do usuário
            if(usuarioReserva.reservas.length >= 5){
                res.status(500).json({ msg: 'O número máximo de reservas já foi alcançado!'})
                return
            }      
            
            // criando a reserva
            const reserva = {
                livroId: req.body.livroId,
                usuarioId: req.body.usuarioId,
                data_reserva: dataReserva,
                data_devolucao_prevista: data_devolucao_prevista,
            }
            
            // adicionando a reserva ao banco
            const resposta = await ReservaModel.create(reserva)
            
            // atualizando as reservas do usuário
            await Usuario.findByIdAndUpdate(req.body.usuarioId, 
                { $push: { reservas: resposta._id } },
                {new: true}
            )

            res.status(201).json({reserva, msg: 'Reserva criada com sucesso!'})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Erro ao reservar livro!'})
        }
    },

    getAll: async(req, res) => {
        try {
            const reservas = await ReservaModel.find()
            res.json(reservas)
        } catch (error) {
            res.status(500).json({ error, msg: 'Erro ao buscar as Reservas' });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id
            const reserva = await ReservaModel.findById(id)

            if (!reserva) {
                res.status(404).json({ msg: 'Reserva não encontrado!' })
                return
            }

            res.json(reserva)
        } catch (error) {
            res.status(500).json({ error: error, msg: 'Erro ao buscar o reserva' })
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id
            const reserva = await ReservaModel.findById(id)

            if(!reserva){
                res.status(404).json({msg: 'Reserva não encontrada'})
                return
            }

            const usuario = await Usuario.findById(reserva.usuarioId)
            if(usuario){
                usuario.reservas.pull(reserva._id)
                await usuario.save()
            }

            const reserva_deletada = await ReservaModel.findByIdAndDelete(id)
            
            res.status(200).json({ reserva_deletada, msg: 'Reserva excluída com sucesso!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao excluir o reserva' })
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id
            const novoUsuarioId = req.body.usuarioId
            const novoLivroId = req.body.livroId

            const reserva = await ReservaModel.findById(id)

            // verificando se a reserva existe
            if(!reserva){
                res.status(404).json({msg: 'Reserva não encontrada'})
                return
            }

            // verificando se o usuarioId foi alterado
            if(reserva.usuarioId.toString() !== novoUsuarioId.toString()){
                // removendo reserva do usuário antigo
                const antigoUsuario = await Usuario.findById(reserva.usuarioId)
                if(antigoUsuario){
                    antigoUsuario.reservas.pull(reserva._id)
                    await antigoUsuario.save()
                }

                // buscando o novo usuário
                const novoUsuario = await Usuario.findById(novoUsuarioId)
                // verificando se o novo usuário existe
                if(!novoUsuario){
                    res.status(404).json({msg: 'Usuário não encontrado!'})
                    return
                }

                // verificando a quantidade de reservas do usuário novo
                if(novoUsuario.reservas.length >= 5){
                    res.status(500).json({msg: 'O limite de reservas desse usuário já foi alcançado'})
                    return
                }
                novoUsuario.reservas.push(reserva._id)
                await novoUsuario.save()
            }

            reserva.livroId = novoLivroId
            reserva.usuarioId = novoUsuarioId
            reserva.data_reserva = req.body.data_reserva || reserva.data_reserva
            reserva.data_devolucao_prevista = req.body.data_devolucao_prevista || reserva.data_devolucao_prevista
            reserva.data_devolucao_real = req.body.data_devolucao_real || reserva.data_devolucao_real
            const reservaAtualizada = await reserva.save()

            res.status(201).json({reservaAtualizada, msg: 'Reserva atualizada com sucesso!'})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Erro ao atualizar reserva!'})
        }
    },
    
    devolver: async(req, res) => {
        try {
            const id = req.params.id
            const reserva = await ReservaModel.findById(id)
            const user = await Usuario.findById(reserva.usuarioId)
            
            if(!reserva){
                res.status(404).json({msg: 'Reserva não encontrada'})
                return
            }
            
            
            // const devolucao = new Date()
            // reserva.data_devolucao_real = devolucao
            // await reserva.save()
            
            const diasAtraso = differenceInDays(reserva.data_devolucao_real, reserva.data_devolucao_prevista)
            let valorMulta = 0
            
            if(diasAtraso > 0){
                valorMulta = diasAtraso * 5

                const novaMulta =
                    {
                        valor: valorMulta,
                        situacao: 'Esperando pagamento!',
                        livroId: reserva.livroId,
                    }
                
    
                user.multas.push(novaMulta)
                await user.save()
            }
            
            const status = reserva.status
            if(status === "Emprestado"){ 
                reserva.status = "Devolvido"
                await reserva.save()
            } else if(status === "Devolvido"){
                res.status(500).json({msg:'O livro já foi devolvido'})
                return
            }

            if(!user){
                res.status(404).json({msg: 'Usuário não encontrado, não foi possível devolver o livro!'})
                return
            }
            
            res.status(200).json({msg: `O livro foi devolvido com uma multa de R$${valorMulta},00 reais`})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Erro ao devolver livro'})
        }
    }
}

module.exports = reservaController