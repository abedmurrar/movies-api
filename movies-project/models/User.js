import { fail } from 'assert';

var db = require('./db.config')

class User {

	// changeUsername(){
	// 	this.
	// }

	static getAllUsers(success,failure){
		return db('users')
		.select('*')
		.then(success)
		.catch(failure)
	}

	static getUserById(id, success, failure) {
		return db('users')
			.select('*')
			.where('id', id)
			.then(success)
			.catch(failure)
	}

	static getUserByUsername(username,success,failure){
		return db('users')
			.select('*')
			.where('username',username)
	}
}
module.exports = User