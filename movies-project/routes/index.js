var express = require('express')
var router = express.Router()

/* GET home page */
router.get('/', (req, res) => {
	return res.render('index')
})
/* GET login page */
router.get('/login', (req, res) => {
	return res.render('login')
})
/* GET signup page */
router.get('/signup', (req, res) => {
	return res.render('signUp')
})
// router.get('/', function (req, res, next) {
// 	res.send(
// 		'<div ' +
//         'style="display:grid;justify-content:center;text-align:center;">' +
//         '<h1>Rarrum Cima</h1>' +
//         '<h2>Backend</h2>' +
//         '<p>Abed Al Rahman Murrar</p>' +
//         '<p>Nizar Fteiha</p>' +
//         '<h2>Frontend</h2>' +
//         '<p>Mohammad Shilleh</p>' +
//         '<h2>Android</h2>' +
//         '<p>Mo\'ath Sandouka</p>' +
//         '</div>'
// 	)
// })

module.exports = router