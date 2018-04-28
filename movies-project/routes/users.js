var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  if (req.params.id) {
    return res.send('get one user')
  } else {
    return res.send('get all users');
  }
});

router.post('/', function (req, res, next) {
  res.send('add user')
})

router.put('/:id', function (req, res, next) {
  res.send('edit user')
})

router.delete('/:id', function (req, res, next) {
  res.send('delete user')
})

module.exports = router;