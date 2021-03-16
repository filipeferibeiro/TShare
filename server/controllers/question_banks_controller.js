const connection = require('../database/connection')

exports.getBanks = async (req, res) => {

    try {
        connection('question_banks').select("*").modify((queryBuilder) => {
            if (req.query.id) {
                queryBuilder.where("id", "=", req.query.id)
            }
            if (req.query.author) {
                queryBuilder.where("author", "=", req.query.author)
            }
        }).then((results) => {
            console.log("Bancos de questões encontrados")
            res.status(200).json(results)
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
} 

exports.post = async(req, res) => {

    question_bank = {
        title: req.body.title,
        author: req.body.author
    }

    console.log(question_bank)
    
    try {
        await connection("question_banks").insert(question_bank)
        return res.status(201).send({"message": `Banco de questões ${question_bank.title} criado com sucesso`})
    } catch (error) {
        return res.status(500).send({"error": error})
    }
}

exports.checkBanksOfQuestion = async (req, res) => {
    
    const questionId = req.query.id
    try {
        
        await connection("question_banks").innerJoin('question_banks_questions as bq1', 'question_banks.id', '=', 'bq.question_bank_id')
        .innerJoin('question_banks_questions as bq2', questionId, '=', 'bq2.question_bank_id').then((results) => {
            return res.status(200).json(results)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }

}