const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login_controller')

/* GET users listing. */
router.post('/login', loginController.login)
router.post('/logout', loginController.logout)
router.get('/checkToken', loginController.checkToken)
module.exports = router;
