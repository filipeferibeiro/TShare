const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const loginController = require('../controllers/login_controller')
const utils = require('../utils/jwt-verify')

router.get('/users', utils.verifyJWT, userController.getAll)
router.post('/users', userController.newUser)
router.get('/users/:id', utils.verifyJWT, userController.getById)
router.post('/login', loginController.login)
router.post('/logout', loginController.logout)

module.exports = router;
