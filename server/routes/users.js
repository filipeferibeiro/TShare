const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const utils = require('../utils/jwt-verify')

router.get('/users', utils.verifyJWT, userController.getAll)
router.post('/users', userController.newUser)

module.exports = router;