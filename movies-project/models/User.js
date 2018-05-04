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
	 */

	static update(id, modification, success, failure) {
		/**
		 * Updates existing user in database
		 * a User can at least update a username, password, or an email
		 * (success) -> array containing the id of last modified row
		 */
		try {
			if (typeof modification.username === 'undefined' &&
				typeof modification.password === 'undefined' &&
				typeof modification.email === 'undefined') {
				throw new Error('Nothing is sent to update')
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
			var username = checkUsername(User.username)
			var email = checkEmail(User.email)
			var salt = checkPassword(User.password)
			return db('users')
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

	static getAllUsers(success, failure) {
		/**
		 * Gets all users from database
		 * (success) -> array of users
		 */
		return db('users')
			// .select('*')
			.select('username','email')
			// .join()
			.then(success)
			.catch(failure)
	}

	static getUserById(id, success, failure) {
		/**
		 * Gets one user by id
		 * (success) -> user object
		 */
		return db('users')
			.select('*')
			.where('id', '=', id)
			.first()
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
			.select('*')
			.where('username', '=', username)
			.first()
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
	return crypto.createHash('sha256').update(User.password).digest('hex')

}

module.exports = User