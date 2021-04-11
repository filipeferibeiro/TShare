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
        return res.status(500).send({ error: "server error" })
    }
}

exports.post = async (req, res) => {

    question_bank = {
        title: req.body.title,
        author: req.body.author
    }

    console.log(question_bank)

    try {
        await connection("question_banks").insert(question_bank)
        return res.status(201).send({ "message": `Banco de questões ${question_bank.title} criado com sucesso` })
    } catch (error) {
        return res.status(500).send({ "error": error })
    }
}

exports.checkBanksOfQuestion = async (req, res) => {

    const questionId = req.query.id
    console.log(questionId)
    const author = req.query.author
    console.log(author)
    try {

        await connection("question_banks")
            .select("*")
            .whereIn("id", connection('question_banks_questions')
                .select("question_bank_id")
                .where("question_id", "=", questionId))
            .where
            ("author", "=", author)

            .then((results) => {
                return res.status(200).json(results)
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "server error" })
    }

}

exports.addQuestionToBank = async (req, res) => {
    if (req.query.questionId && req.query.questionBankId) {

        const link = {
            question_id: req.query.questionId,
            question_bank_id: req.query.questionBankId
        }

        try {
            await connection("question_banks_questions").insert(link).then((results) => {
                return res.status(201).send({ message: "Questão adicionada ao banco" })
            })
        } catch (error) {
            return res.status(500).send({ error: "server error" })
        }

    }
    else {
        return res.status(400).send({ error: "invalid input" })
    }
}
exports.getBankQuestions = async (req, res) => {

    const questionBankId = req.query.questionBankId
    try {

        await connection("questions")
            .select("*")
            .whereIn("id", connection('question_banks_questions')
                .select("question_id")
                .where("question_bank_id", "=", questionBankId))
            .then((results) => {
                return res.status(200).json(results)
            })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "server error" })
    }

}