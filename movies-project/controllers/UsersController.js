var User = require('../models/User')

class UserController {
	static get(req, res, next) {
		if (req.params.id) {
			return res.send('get one user')
		} else {
			return res.send('get all users')
		}
	}

	static getFavorites(req, res, next) {
		return res.send('get all favs')
	}

	static post(req, res, next) {
		res.send('add user')
	}

	static put(req, res, next) {
		res.send('edit user')
	}

	static delete(req, res, next) {
		res.send('delete user')
	}
}

module.exports = UserController