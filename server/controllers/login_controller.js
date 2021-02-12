const connection = require('../database/connection')
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    
    const login = req.body.login
    const password = req.body.password

    try {
        const credentials = await connection('users').where({login: login}).select(['id','login', 'password'])
        const pass_check = await bcrypt.compare(password, credentials.password)
        
        if (pass_check){
            const token = jwt.sign( credentials.id , process.env.SECRET, { expiresIn: 300})
            return res.json({auth: true, token: token})
        } else {
            return res.status(500).json({'message': "Login inválido"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }  
}

exports.logout = async (req, res, next) => {
    res.json({auth: false, token: null})
}