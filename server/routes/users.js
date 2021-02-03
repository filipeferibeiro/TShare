var express = require('express')
var router = express.Router()
var userController = require('./controllers/user_controller.js')
var loginController = require('./controllers/login_controller.js')

/* GET users listing. */
router.get('/', userController.getAll)
router.post('/', userController.newUser)
router.get('/:id', userController.getById)
router.post('/login', loginController.login)
router.post('/logout', loginController.logout)
module.exports = router;
