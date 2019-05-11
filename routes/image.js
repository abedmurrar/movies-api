var express = require("express");
var router = express.Router();
var ImageController = require("../controllers/ImageController");

/* GET home page. */
router.get("/:poster_dir", ImageController.get);

module.exports = router;
