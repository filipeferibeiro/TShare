const express = require('express')
const router = express.Router()
const controller = require('../controllers/question_banks_controller')
const utils = require('../utils/jwt-verify')

//Recupera todos os bancos
router.get('/banks', controller.getBanks)
//Cria um banco de questões
router.post('/banks', utils.verifyJWT, controller.post)
//Atualiza um banco
router.put('/banks', utils.verifyJWT, controller.updateBank)
//Remove um banco
router.delete('/banks', utils.verifyJWT, controller.removeBank)

//Recupera os bancos que contém a questão
router.get('/questions/:questionId/banks', controller.checkBanksOfQuestion)
//Recupera as questões de um banco específico
router.get('/banks/:id', utils.verifyJWT, controller.getBankQuestions)

//Adiciona uma questão a um banco
router.put('/banks/:bankId/questions/:questionId', utils.verifyJWT, controller.addQuestionToBank)
//Remove uma questão de um banco
router.delete('/banks/:bankId/question/:questionId', utils.verifyJWT, controller.removeQuestionFromBank)

module.exports = router;    ww=====                 
