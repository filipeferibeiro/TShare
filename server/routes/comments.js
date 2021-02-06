const express = require('express')
const router = express.Router()
const controller = require('../controllers/comments_controller')

router.get('/:id', controller.getByQuestionId)
router.post('/', controller.post);
// router.put('/:id', controller.put);
// router.delete('/:id', controller.delete);

module.exports = router;
