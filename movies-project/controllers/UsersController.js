var User = require('../models/User')
const HttpStatus = require('http-status-codes')
var session
class UserController {
	static get(req, res, next) {
		if (req.params.id) {
			return User.getUserById(req.params.id,
				(user) => {
					if (user) {
						return res.status(HttpStatus.OK).json(user)
					}
					return req.status(HttpStatus.NOT_FOUND).json({
						message: 'No user with id ' + req.params.id
					})
				}, next)
		} else {
			return User.getAllUsers(
				(users) => {
					if (users.length > 0) {
						return res.status(HttpStatus.OK).json(users)
					}
					return res.status(HttpStatus.NOT_FOUND).json({
						message: 'There are no users'
					})
				}, next)
		}
	}

	static getFavorites(req, res, next) {
		return res.send('get all favs')
	}

	static post(req, res, next) {
		return User.add(req.body,
			(data) => {
				if (data.length > 1) {
					return res.status(HttpStatus.CREATED).json(req.body)
				}
				return res.status(HttpStatus.NOT_ACCEPTABLE).json({
					message: 'User creation failed'
				})
			}, next)
	}

	static put(req, res, next) {
		session = req.session
		return User.update(req.params.id, req.body,
			(data) => {
				if (data.length > 0) {
					return res.status(HttpStatus.NO_CONTENT).json({
						message: 'User modified successfully'
					})
				}
				return res.status(HttpStatus.NOT_ACCEPTABLE).json({
					message: 'User modification failed'
				})
			}, next)
	}

	static delete(req, res, next) {
		User.delete(req.params.id,
			(data) => {
				if (data) {

				}

			}, next)
	}

	static login(req, res, next) {
		session = req.session
	}

	static handleError(error, req, res, next) {
		return res.status(HttpStatus.BAD_REQUEST).json({
			message: error.message
		})
	}
}

module.exports = UserController