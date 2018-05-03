var express = require('express')
var router = express.Router()
var ImageController = require('../controllers/ImageController')

/* GET home page. */
router.get('/:path', ImageController.get)
router.post('/',ImageController.create)

module.exports = router
