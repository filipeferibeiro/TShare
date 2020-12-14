const express = require('express')
const router = express.Router()
const controller = require('../controllers/questions_controller')

router.get('/:id', controller.getById)
router.get('/', controller.getAll)
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
