const connection = require('../database/connection')

exports.get = async (req, res) => {
    
    const questionId = req.params.id
    try {
        const items = await connection('questions').where({id: questionId}).select('*')
        return res.status(200).json(items)
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}

exports.post = async (req, res) => {
    const newQuestion = req.body
    console.log(newQuestion)

    try {
        await connection('questions').insert(newQuestion)
        res.status(201).send({message: "question created"})
    }
    catch (error){
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
    
}

exports.put = async (req, res) => {
    const updatedQuestion = req.body
    const questionId = req.params.id
    try {
        await connection('questions').where({id: questionId}).update(updatedQuestion)
        return res.status(200).send({message: "Question updated"})    
    } catch (error) {
        return res.status(500).send({error_msg: `${error}`})
    }
    

}

exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const items = await connection('questions').where({id: id}).del()
        return res.status(200).send({message: "Question deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }

}