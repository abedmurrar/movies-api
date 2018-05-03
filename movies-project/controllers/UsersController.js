var User = require('../models/User')
const HttpStatus = require('http-status-codes')
var session
class UserController {
	static get(req, res, next) {
		if (req.params.id) {
			return User.getUserById(req.params.id,
				(user) => {
					if (user) {
						return req.status(HttpStatus.OK).json(user)
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
					return req.status(HttpStatus.CREATED).json({
						message: 'User successfully added'
					})
				}
				return req.status(HttpStatus.NOT_IMPLEMENTED).json({
					message: 'User creation failed'
				})
			}, next)
	}

	static put(req, res, next) {
		session = req.session
		res.send('edit user')
	}

	static delete(req, res, next) {
		res.send('delete user')
	}

	static login(req, res, next) {
		session = req.session
	}
}

module.exports = UserController