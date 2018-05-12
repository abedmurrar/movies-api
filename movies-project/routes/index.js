var express = require('express')
var router = express.Router()
var session

/* GET home page */
router.get('/', (req, res) => {
	return res.render('index')
})
/* GET login page */
router.get('/login', (req, res) => {
	session = req.session
	if (typeof session.username !== 'undefined')
		return res.render('index')
	return res.render('login')
})
/* GET signup page */
router.get('/signup', (req, res) => {
	return res.render('signUp')
})

router.get('/admin', (req, res) => {
	session = req.session
	if (session.role === 'admin')
		return res.render('admin')
	return res.render('index')
})

module.exports = router