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

exports.getById = async (req, res) => {
    const userId = req.query.id

    return await connection('users').select("*").where("id","=", userId)
}

exports.getAll = async (req, res) => {
    return res.status(200).send({'message': 'cu'})
}