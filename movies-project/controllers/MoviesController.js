var Movie = require('../models/Movie')

class MovieController {

	static get(req, res, next) {
		if (req.params.id) {
			return res.send('get one movie')
		} else {
			return res.send('get all movies')
		}
	}

	static post(req, res, next) {
		res.send('add movie')
	}

	static put(req, res, next) {
		res.send('edit movie')
	}

	static delete(req, res, next) {
		res.send('delete movie')
	}
}

module.exports = MovieController