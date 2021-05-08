const express = require('express')
const router = express.Router()
const controller = require('../controllers/comments_controller')
const utils = require('../utils/jwt-verify')

router.get('/comments/:id', controller.getByQuestionId)
router.post('/comments/', utils.verifyJWT, controller.post);
router.post('/comments/vote', utils.verifyJWT, controller.vote)
router.delete('/:id', controller.delete);

module.exports = router;
