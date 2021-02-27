const express = require('express')
const router = express.Router()
const controller = require('../controllers/comments_controller')
const utils = require('../utils/jwt-verify')

router.get('/comments/:id', controller.getByQuestionId)
router.post('/comments/', utils.verifyJWT, controller.post);
// router.put('/:id', controller.put);
// router.delete('/:id', controller.delete);

module.exports = router;
