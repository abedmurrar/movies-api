var express = require('express')
var MovieController = require('../controllers/MoviesController')
var router = express.Router()

router.get('/:id?', MovieController.get)
router.post('/', MovieController.post)
router.put('/:id', MovieController.put)
router.delete('/:id', MovieController.delete)

module.exports = router