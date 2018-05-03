var express = require('express')
var UserController = require('../controllers/UsersController')

var router = express.Router()

/* GET users listing. */
router.get('/:id?', UserController.get)
router.post('/', UserController.post)
router.put('/:id', UserController.put)
router.delete('/:id', UserController.delete)
router.get('/favorites', UserController.getFavorites)

module.exports = router
