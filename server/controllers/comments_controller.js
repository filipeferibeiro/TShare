const connection = require('../database/connection')

exports.getByQuestionId = async (req, res) => {
    
    const question_id = req.params.id
    try {
        const comments = await connection('comments').select(
            'comments.id',
            'comments.text',
            'comments.author_id',
            'users.name',
            'comments.creation_date'
            )
        .from('comments')
        .where(
            {question_id: question_id})
        .innerJoin(
            'users',
            'comments.author_id',
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
    const question_id = req.body.question_id
    const author_id = req.body.author_id
    const creation_date = new Date()

    const comment = {
        text: text,
        question_id: question_id,
        author_id: author_id,
        creation_date: creation_date,
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
    const updatedComment = req.body
    const commentId = req.params.id
    try {
        await connection('comments').where({id: commentId}).update(updatedComment)
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