var Image = require('../models/Image')

class ImageController {
	static get(req, res, next) {
		return res.send('get one image from '+req.params.path)
	}

	static create(req, res, next) {
		// check multer package
		return res.send('upload image')
	}

}

module.exports = ImageController