const connection = require('../database/connection')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.newUser = async (req, res) => {
    
    var newUser = req.body
    try {
        const salt = bcrypt.genSaltSync(7)
        const hash = bcrypt.hashSync(newUser.password, salt )

        newUser.password = hash
        
        const newUserId = await connection('users').insert(newUser).returning('id')
        
        if (newUserId){
            res.status(201).send({'message': `Usuário criado com sucesso com ID: ${newUserId}` })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}

exports.getById = async (req, res) => {
    return res.status(200).send({'message': 'cu'})
}

exports.getAll = async (req, res) => {
    return res.status(200).send({'message': 'cu'})
}