var express = require('express')
var MovieController = require('../controllers/MoviesController')
var multer = require('multer')
// var upload = multer({ dest: '../img/' })
var router = express.Router()

router.get('/:id?', MovieController.get)
// router.post('/', upload.single('poster'), MovieController.post)
router.put('/:id', MovieController.put)
router.delete('/:id', MovieController.delete)

module.exports = router

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         crypto.pseudoRandomBytes(16, function (err, raw) {
//             cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
//         });
//     }
// });

// var upload = multer({
//     storage: storage
// });