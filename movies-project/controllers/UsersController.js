var User = require('../models/User').User
var checkPassword = require('../models/User').checkPassword
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
					return res.status(HttpStatus.NOT_FOUND).json({
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
		return User.getFavorites(req.params.id,
			(movies) => {
				if (movies) {
					return res.status(HttpStatus.OK).json(movies)
				}
				return res.status(HttpStatus.NOT_FOUND).json({
					message: 'User ' + req.params.id + ' doesn\'t have favorites movies, or user does not exist'
				})
			}, next)
	}

	static post(req, res, next) {
		if (typeof req.body.role !== 'undefined') {
			delete req.body.role
		}
		return User.add(req.body,
			(data) => {
				if (data) {
					return res.status(HttpStatus.CREATED).json(req.body)
				}
				return res.status(HttpStatus.BAD_REQUEST).json({
					message: 'User creation failed'
				})
			}, next)
	}

	static addFavorite(req, res, next) {
		User.addFavorite(req.params.id, req.body.movie,
			(data) => {
				if (data) {
					return res.status(HttpStatus.OK).json({
						message: 'Movie ' + req.body.movie + ' is now favorite for user ' + req.params.id + ' Successfully'
					})
				}
				return res.status(HttpStatus.NOT_ACCEPTABLE).json({
					message: 'Movie favorite failed'
				})
			}, next)
	}

	static put(req, res, next) {
		session = req.session
		return User.update(req.params.id, req.body,
			(data) => {
				if (data) {
					return res.status(HttpStatus.NO_CONTENT).json({
						message: 'User modified successfully'
					})
				}
				return res.status(HttpStatus.BAD_REQUEST).json({
					message: 'User modification failed'
				})
			}, next)
	}

	static delete(req, res, next) {
		User.delete(req.params.id,
			(data) => {
				if (data) {
					return res.status(HttpStatus.OK).json({
						message: 'User ' + req.params.id + ' was deleted successfully'
					})
				}
				return res.status(HttpStatus.NOT_FOUND).json({
					message: 'User does not exist'
				})
			}, next)
	}

	static login(req, res, next) {
		session = req.session
		if (typeof req.body.username === 'undefined' ||
			typeof req.body.password === 'undefined') {
			throw new Error('username and password must be passed to login')
		}
		return User.getUserByUsername(req.body.username,
			(user) => {
				if (typeof user.username !== 'undefined') {
					var salt = checkPassword(req.body.password)
					if (salt === user.password) {
						session.username = user.username
						session.uid = user.id
						session.email = user.email
						delete user.password
						return res.status(HttpStatus.OK).json(user)
					}
					return res.status(HttpStatus.UNAUTHORIZED).json({
						message: 'User login failed'
					})
				}
				return res.status(HttpStatus.NOT_FOUND).json({

					message: 'User does not exist'
				})
			}, next)
	}

	static handleError(error, req, res, next) {
		return res.status(HttpStatus.BAD_REQUEST).json({
			message: error.message
		})
	}
}

module.exports = UserController