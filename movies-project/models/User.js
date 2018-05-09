var db = require('./db.config')
const crypto = require('crypto')
const usernameRegex = /^[a-z](([\w][.-]{0,1}){6,22})[a-z]$/
/*
 * Username Regular Expression
 * a username must start and end with an alphabet
 * a username at least 7 characters and at most 24 characters of alphabets and digits
 * can contain [.] dot but not repeatedly, [-] dash but not repeatedly, and [_] underscore
 */
const emailRegex = /^[\w]([\w][.-]{0,1}?)+@([a-z0-9][_.-]{0,1}?)+\.([a-z]{2,5})$/
/*
 * Email Regular Expression
 * an email is validated with respect to some of the RFC 5322 Syntax
 * https://tools.ietf.org/html/rfc5322
 */
const passwordRegex = /^.{7,}$/
/*
 * Password Regular Expression
 * a password must contain at least 7 characters
 */
class User {
	/**
	 * All functions are static in User model
	 * success and failure parameters are callback functions
	 * failure callback always returns an Error
	
	 * users table's columns in database are :
	 * 	id (Primary key) | int
	 * 	username | varchar
	 * 	email | varchar
	 * 	u_role (foreign key to roles.role) | int
	
	 * Roles table have two rows only : (admin, user)
	 * roles table's columns in database are :
	 * 	role_id (Primary Key)
	 * 	role
	 
	 * Favorites table shows what movies are favorites
	 * for a specific user (User-Movie relationship)
	 * favorites table's column in database are :
	 * 	fav_id (Primary Key)
	 * 	user (foreign key to users.id)
	 * 	fav_movie (foreign key to movies.id)
	 */

	static add(User, success, failure) {
		/**
		 * Adds new user to database
		 * a User must have a username, password, email
		 * (success) -> array containing the id of last inserted row
		 */
		try {
			if (typeof User.username === 'undefined' ||
				typeof User.password === 'undefined' ||
				typeof User.email === 'undefined') {
				throw new Error('A User must have a username, email, and a password')
			}
			if (typeof User.id !== 'undefined') {
				delete User.id
			}
			var username = checkUsername(User.username)
			var email = checkEmail(User.email)
			var salt = checkPassword(User.password)

			db('users')
				.insert({
					username: username,
					email: email,
					password: salt
				})
				.then(success)
				.catch(failure)
		} catch (error) {
			failure(error)
		}

	}

	static addFavorite(user_id, movie_id, success, failure) {
		return db('favorites')
			.insert({
				user: user_id,
				fav_movie: movie_id
			})
			.then(success)
			.catch(failure)
	}

	static getAllUsers(success, failure) {
		/**
		 * Gets all users from database
		 * (success) -> array of users
		 */
		return db('users')
			.select('username', 'email', 'role')
			.join('roles', 'roles.role_id', '=', 'users.u_role')
			.timeout(10000)
			.then(success)
			.catch(failure)
	}

	static getUserById(id, success, failure) {
		/**
		 * Gets one user by id
		 * (success) -> user object
		 */
		return db('users')
			.select('username', 'email', 'role')
			.join('roles', 'roles.role_id', '=', 'users.u_role')
			.where('id', '=', id)
			.first()
			.timeout(10000)
			.then(success)
			.catch(failure)
	}

	static getUserByUsername(username, success, failure) {
		/**
		 * Gets one user by username
		 * (success) -> user object
		 * This function will be used for login 
		 * then the password is compared in the callback function
		 * 
		 */

		return db('users')
			.select('id','username', 'email', 'password','role')
			.join('roles', 'roles.role_id', '=', 'users.u_role')
			.where('username', '=', username)
			.first()
			.timeout(10000)
			.then(success)
			.catch(failure)
	}

	static getFavorites(id, success, failure) {
		return db('favorites')
			.select('movies.id as id', 'name', 'category', 'age_rating', 'user_rating', 'year', 'language', 'poster_dir')
			.join('movies', 'movies.id', '=', 'favorites.fav_movie')
			.where('user', id)
			.timeout(10000)
			.then(success)
			.catch(failure)
	}

	static update(id, modification, success, failure) {
		/**
		 * Updates existing user in database
		 * a User can at least update a username, password, or an email
		 * (success) -> the id of modified row, 0 if doesn't exist
		 */
		try {
			if (typeof modification === 'undefined' ||
				(
					typeof modification.username === 'undefined' &&
					typeof modification.password === 'undefined' &&
					typeof modification.email === 'undefined'
				)
			) {
				throw new Error('Nothing is sent to update')
			}
			if (modification.id !== 'undefined') {
				delete modification.id
			}
			var User = {}
			if (modification.username) {
				User.username = checkUsername(modification.username)
			}
			if (modification.email) {
				User.email = checkEmail(modification.email)
			}
			if (modification.password) {
				User.password = checkPassword(modification.password)
			}
			return db('users')
				.update(User)
				.where('id', '=', id)
				.then(success)
				.catch(failure)
		} catch (error) {
			failure(error)
		}

	}

	static delete(id, success, failure) {
		/**
		 * expects id -> Integer
		 * Deletes one user by id
		 */
		return db('users')
			.del()
			.where('id', '=', id)
			.then(success)
			.catch(failure)
	}
}

function checkUsername(username) {
	username = username.trim().toLowerCase()
	if (username.length === 0 || !usernameRegex.test(username)) {
		throw new Error('Username is not valid or contains invalid characters')
	}
	return username
}

function checkEmail(email) {
	email = email.trim().toLowerCase()
	if (email === '' || !emailRegex.test(email)) {
		throw new Error('Email is not valid')
	}
	return email
}

function checkPassword(password) {
	if (!passwordRegex.test(password)) {
		throw new Error('Password must be at least 7 characters')
	}
	return crypto.createHash('sha256').update(password).digest('hex')
}

module.exports = {
	User,
	checkUsername,
	checkEmail,
	checkPassword
}