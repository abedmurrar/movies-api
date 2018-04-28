var db = require('./db.config')

class User {

    static getUserById(id, success, failure) {
        return db('users')
            .select('*')
            .where('id', id)
            .then(success)
            .catch(failure)
    }
}

// var u = new User()
//test
User.getUserById(1, function (user) {
        console.log(user)
    },
    function (error) {
        console.error(error)
    }
)

module.exports = User