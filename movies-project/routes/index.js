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
	// if (session.role === 'admin')
	return res.render('admin')
	// return res.render('index')
})

router.get('/user', (req, res, next) => {
	session = req.session
	return res.render('user', {
		email: session.email,
		username: session.username
	})
})

router.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})

module.exports = router