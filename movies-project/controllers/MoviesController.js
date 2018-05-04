var Movie = require('../models/Movie')
const HttpStatus = require('http-status-codes')
class MovieController {

	static get(req, res, next) {
		if (req.params.id) {
			return Movie.getMovieById(req.params.id,
				(movie) => {
					if (movie) {
						return res.status(HttpStatus.OK).json(movie)
					}
					return res.status(HttpStatus.NOT_FOUND).json({
						message: 'No movie with id ' + req.params.id
					})
				}, next)
		} else {
			return Movie.getAllMovies(
				(movies) => {
					if (movies.length > 0) {
						return res.status(HttpStatus.OK).json(movies)
					}
					return res.status(HttpStatus.NOT_FOUND).json({
						message: 'There are no movies'
					})
				}, next)
		}
	}

	static post(req, res, next) {
		return Movie.add(req.body,
			(data) => {
				if (data.length > 1) {
					return res.status(HttpStatus.CREATED).json({
						message: 'Movie successfully added'
					})
				}
				return res.status(HttpStatus.BAD_REQUEST).json({
					message: 'Movie creation failed'
				})
			}, next)
	}


	static put(req, res, next) {
		return Movie.update(req.params.id, req.body,
			(data) => {
				if (data.length > 0) {
					return res.status(HttpStatus.NO_CONTENT).json({
						message: 'Movie modified successfully'
					})
				}
				return res.status(HttpStatus.NOT_ACCEPTABLE).json({
					message: 'Movie modification failed'
				})
			}, next)
	}

	static delete(req, res, next) {
		Movie.delete(req.params.id,
			(data) => {
				if (data) {
					return res.status(HttpStatus.OK).json({
						message: 'Movie ' + req.params.id + ' was deleted successfully'
					})
				}
				return res.status(HttpStatus.NOT_FOUND).json({
					message: 'Movie does not exist'
				})
			}, next)
	}
}

module.exports = MovieController