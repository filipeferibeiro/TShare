const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const loginController = require('../controllers/login_controller')

/* GET users listing. */
router.get('/', userController.getAll)
router.post('/', userController.newUser)
router.get('/:id', userController.getById)
router.post('/login', loginController.login)
// router.post('/logout', loginController.logout)

module.exports = router;
