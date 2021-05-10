const express = require('express')
const router = express.Router()
const controller = require('../controllers/questions_controller')
const utils = require('../utils/jwt-verify')


router.get('/questions/:id', utils.verifyJWT, controller.getById)
router.get('/questions/',utils.verifyJWT,  controller.getAll)
router.post('/questions/',utils.verifyJWT, controller.post)
router.put('/questions/:id',utils.verifyJWT,  controller.put)
router.delete('/questions/:id',utils.verifyJWT,  controller.delete)
router.post('/questions/vote', utils.verifyJWT, controller.vote)

module.exports = router;
