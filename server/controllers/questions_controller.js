const { request } = require('express')
const connection = require('../database/connection')

exports.get = async (req, res) => {
    //Recupera uma questão pelo ID

    const questionId = req.params.id
    try {
        //Recupera enunciado e autor
        const items = await connection('questions').where({id: questionId}).select('*')        
        //Recupera alternativas
        items[0].alternatives = await connection('alternatives').where({question_id: questionId}).select('*')
        //Recupera as tags das questões
        items[0].tags = await connection.from('tags').innerJoin('tags_questions').on('tags.id', '=', 'tags_questions.tag_id').innerJoin('question_id', '=', questionId)
        

        return res.status(200).json(items[0])
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}
exports.post = async (req, res) => {
    const requestBody = req.body
    //Isolando o enunciado e autor da questão
    const question = (({stem, author, description}) => ({stem, author, description}))(requestBody)

    try {
        //ALTERNATIVAS

        //Criando a questão e recuperando seu ID
        const questionId = (await connection('questions').insert(question).returning('id'))[0]
        //Criando as alternativas inserindo o ID da questão criada acima a elas
        const alternatives = requestBody.alternatives.map(alternative => ({...alternative, 'question_id': questionId}))
        //Inserte as alternativas no banco
        await connection('alternatives').insert(alternatives).then()
        
        // TAGS
        const tags = requestBody.tags
        await connection('tags').insert(tags).then()
        const inserted_tags = await connection.select('id').from('tags').whereIn('name', tags)
        console.log(inserted_tags)
        await connection('tags_questions').insert(inserted_tags.map(tag => ({...tag, 'question_id': questionId})))
        

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