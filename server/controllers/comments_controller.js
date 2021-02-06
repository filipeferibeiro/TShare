const connection = require('../database/connection')
const knex = require('knex')

exports.getByQuestionId = async (req, res) => {
    
    const questionId = req.params.id
    try {
        const comments = await connection('comments').select(
            'comments.id',
            'comments.text',
            'comments.authorId',
            'users.name',
            'comments.creationDate'
            )
        .from('comments')
        .where(
            {questionId: questionId})
        .innerJoin(
            'users',
            'comments.authorId',
            'users.id'
            )
            
        
       
        return res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}


exports.post = async (req, res) => {
    const text = req.body.text
    const questionId = req.body.questionId
    const authorId = req.body.authorId
    const creationDate = new Date()

    const comment = {
        text: text,
        questionId: questionId,
        authorId: authorId,
        creationDate: creationDate,
    }

    try {

        await connection('comments').insert(comment).then()        
        res.status(201).send({message: "comment created"})
    }
    catch (error){
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
    
}

exports.put = async (req, res) => {
    const updatedcomment = req.body
    const commentId = req.params.id
    try {
        await connection('comments').where({id: questionId}).update(updatedQuestion)
        return res.status(200).send({message: "comment updated"})    
    } catch (error) {
        return res.status(500).send({error_msg: `${error}`})
    }
    

}

exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const items = await connection('comments').where({id: id}).del()
        return res.status(200).send({message: "comment deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }

}