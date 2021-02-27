const connection = require('../database/connection')
const bcrypt = require('bcryptjs')

exports.newUser = async (req, res) => {

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
        
    try {
        const salt = bcrypt.genSaltSync(7)
        newUser.password = bcrypt.hashSync(newUser.password, salt)        
        await connection('users').insert(newUser)    
        res.status(201).send({'message': `Usuário criado com sucesso` })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}

exports.getAll = async (req, res) => {
    try {
        connection('users').select("id", "name", "email", "reputation", "lastLogin", "accountCreation").modify((queryBuilder) => {
            if (req.query.id) {
             queryBuilder.where("id","=", req.query.id)
            }
            if (req.query.email) {
                queryBuilder.where("email", "=", req.query.email)
            }
        })
        .then((results) => {
            res.status(200).json(results) 
        })
       
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
}