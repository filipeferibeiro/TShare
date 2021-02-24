const connection = require('../database/connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.checkToken = async (req, res) => {

    try {
        const validToken = jwt.verify(req.headers['x-access-token'], process.env.SECRET)
        return res.json().status(200).send(validToken)

    } catch (error) {
        return res.json().status(500).send({error: "Token inválido ou expirado"})
    }
}


exports.login = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    try {
        const credentials = await connection('users').where("email", "=", email).select('email', 'password')


        bcrypt.compare(password, credentials[0].password, async (err, result) => {
            if (err){
                return res.status(500).json({"message": "Erro de servidor"})
            }

            if (result == true) {
                const userId = await connection('users').select('id').where('email', '=', email).then()
                const token = jwt.sign({email: email, id: userId}, process.env.SECRET, {expiresIn: 86400})
                await connection('users').where('email', '=', email).update({lastLogin: new Date().toISOString().slice(0, 19).replace('T', ' ')}).then()
    
                return res.status(200).json({auth: true, token: token})
            }

            return res.status(401).json({'message': "Login inválido"})
        })

        
      

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
}

exports.logout = async (req, res) => {
    return res.json({auth: false, token: null})
}