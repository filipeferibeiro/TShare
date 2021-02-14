const connection = require('../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('knex')


async function checkUser(email, password){
    try {
        const credentials = await connection('users').where({email: email}).select(['email', 'password'])
        return await bcrypt.compare(password, credentials.password)
    
    } catch (error) {
        return false    
    }
}
   

exports.login = async (req, res, next) => {
    
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    try {       
        await connection('users').where('email', '=', email ).update({lastLogin: new Date().toISOString().slice(0, 19).replace('T', ' ')})
        if (checkUser(email, password)){
            const token = jwt.sign( {id: id} , process.env.SECRET, { expiresIn: 86400 })
            
            return res.status(200).json({auth: true, token: token})
        } else {
            return res.status(500).json({'message': "Login inválido"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }  
}

exports.logout = async (req, res, next) => {
    return res.json({auth: false, token: null})
}