var Movie = require('../models/Movie')
const HttpStatus = require('http-status-codes')
class MovieController {

	static get(req, res, next) {
		if (req.params.id) {
			return Movie.getMovieById(req.params.id,
			(movie) => {
				if(movie){
					return req.status(HttpStatus.OK).JSON(movie)
				}
				return req.status(HttpStatus.NOT_FOUND).json({
					message: 'No movie with id ' + req.params.id
				})
			},next)
		}else {
				return Movie.getAllMovies(
					(movies) => {
						if (movies.length > 0){
							return res.status(HttpStatus.OK).json(movies)
						}
						return res.status(HttpStatus.NOT_FOUND).json({
							message: 'There are no movies'
						})
					},next)
		}
	}

	static post(req, res, next) {
		return Movie.add(req.body,
			(data) => {
				if (data.length > 1) {
					return req.status(HttpStatus.CREATED).json({
						message: 'Movie successfully added'
					})
				}
				return req.status(HttpStatus.NOT_IMPLEMENTED).json({
					message: 'Movie creation failed'
				})
			}, next)
	}
	static put(req, res, next) {
		res.send('edit movie')
	}

	static delete(req, res, next) {
		res.send('delete movie')
	}
}

module.exports = MovieController