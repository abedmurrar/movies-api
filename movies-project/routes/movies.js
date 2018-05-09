var express = require('express')
var MovieController = require('../controllers/MoviesController')
var multer = require('multer')
var path = require('path')
var router = express.Router()

var upload = multer({
	fileFilter: (req, file, cb) => {

		var filetypes = /jpeg|jpg|png|svg|gif|bmp/
		var mimetype = filetypes.test(file.mimetype)
		var extname = filetypes.test(path.extname(file.originalname).toLowerCase())

		if (mimetype && extname) {
			return cb(null, true)
		}
		cb('Error: File upload only supports the following filetypes - ' + filetypes)
	},
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './img')
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + path.extname(file.originalname))
		}
	})
})

router.get('/:id?', MovieController.get)
router.post('/', upload.single('poster'), MovieController.post)
router.put('/:id', upload.single('poster'), MovieController.put)
router.delete('/:id', MovieController.delete)

module.exports = router