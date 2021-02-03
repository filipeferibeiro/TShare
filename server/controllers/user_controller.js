const connection = require('../database/connection')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.post = async (req, res) => {
    
    var newUser = req.body
    try {
        const salt = bcrypt.genSaltSync(7)
        const hash = bcrypt.hashSync(newUser.password, salt )

        newUser.password = hash
        
        const newUserId = await connection('users').insert(newUser).returning('id')
        
        if (newUserId){
            return res.status(201).send({'message': `Usuário criado com sucesso com ID: ${newUserId}` })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}