var db = require('./db.config')

class Movie {

	static add(Movie, success, failure) {
		return db('movies')
			.insert(Movie)
			.then(success)
			.catch(failure)
	}

	static update(id, modification, success, failure) {
		return db('movies')
			.update(modification)
			.where('id', '=', id)
			.then(success)
			.catch(failure)
	}

	static delete(id, success, failure) {
		return db('movies')
			.del()
			.where('id', '=', id)
			.then(success)
			.catch(failure)
	}

	static getMovieById(id, success, failure) {
		return db('movies')
			.select('*')
			.where('id', '=', id)
			.first()
			.then(success)
			.catch(failure)
	}

	static getAllMovies(success, failure) {
		return db('movies')
			.select('*')
			.then(success)
			.catch(failure)
	}

}

module.exports = Movie