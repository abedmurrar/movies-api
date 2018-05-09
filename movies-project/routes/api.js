var express = require('express')
var router = express.Router()

/* GET home page */
router.get('/', function (req, res, next) {
	res.send(
		'<h1>Rarrum Cima API</h1>'+
		'<p>/movies</p>'+
		'<p>/users</p>'+
		'<p>/img</p>'
	)
})

module.exports = router