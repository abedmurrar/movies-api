var path = require('path')
var debug = require('debug')('images')

class ImageController {
	static get(req, res, next) {
		var options = {
			root: path.join(__dirname, '../img'),
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		}
		res.sendFile(req.params.poster_dir, options, function (err) {
			if (err) {
				next()
			} else {
				debug('Sent:', req.params.poster_dir)
			}
		})
	}
}

module.exports = ImageController