var db = require('./db.config')

const nameRegex = /^[\w\d.$\- ]+$/
/**
 * Movie name Regular Expression
 * a movie name can contain alphanumeric characters 
 * and dashes, spaces, and dots only
 */


class Movie {
	/**
	 * All functions are static in Movie model
	 * success and failure parameters are callback functions
	 * failure callback always returns an Error
	 
	 * movie's table's columns in database are :
	 */

	static add(Movie, success, failure) {
		/**
		 * Adds new movie to database
		 * a Movie must have a name, age_rating, user_rating, 
		 * category, year, language, and poster_dir
		 * (success) -> array containing the id of last inserted row
		 */
		try {
			if (typeof Movie.name === 'undefined' ||
				typeof Movie.category === 'undefined') {
				throw new Error('A Movie must have a name, category')
			}
			if (typeof Movie.id !== 'undefined') {
				delete Movie.id
			}
			return db('movies')
				.insert(Movie)
				.then(success)
				.catch(failure)
		} catch (error) {
			failure(error)
		}
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

	static update(id, modification, success, failure) {
		/**
		 * Updates existing movie in database
		 * a Movie can at least update a name, age_rating, user_rating, 
		 * category, year, language, or poster_dir
		 * (success) -> the id of modified row, 0 if doesn't exist
		 */
		if (typeof modification === 'undefined' ||
			(
				typeof modification.name === 'undefined' &&
				typeof modification.age_rating === 'undefined' &&
				typeof modification.user_rating === 'undefined' &&
				typeof modification.category === 'undefined' &&
				typeof modification.year === 'undefined' &&
				typeof modification.language === 'undefined' &&
				typeof modification.poster_dir === 'undefined'
			)
		) {
			throw new Error('Nothing is sent to update')
		}
		if (modification.id !== 'undefined') {
			delete modification.id
		}

		return db('movies')
			.update(modification)
			.where('id', '=', id)
			.then(success)
			.catch(failure)
	}

	static delete(id, success, failure) {
		/**
		 * expects id -> Integer
		 * Deletes one movie by id
		 */
		return db('movies')
			.del()
			.where('id', '=', id)
			.then(success)
			.catch(failure)
	}
}

module.exports = Movie