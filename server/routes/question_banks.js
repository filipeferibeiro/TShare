const express = require('express')
const router = express.Router()
const controller = require('../controllers/question_banks_controller')
const utils = require('../utils/jwt-verify')

router.get('/questionBanks/', controller.getBanks)
router.post('/questionBanks/', utils.verifyJWT, controller.post);
router.get('/questionBanksCheck', controller.checkBanksOfQuestion)
module.exports = router;
