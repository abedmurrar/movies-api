var express = require("express");
var UserController = require("../controllers/UsersController");

var router = express.Router();

router.get("/:id?", UserController.get);
router.post("/", UserController.post);
router.put("/:id", UserController.put);
router.delete("/:id", UserController.delete);
router.get("/:id/favs", UserController.getFavorites);
router.post("/:id/favs", UserController.addFavorite);
router.post("/login", UserController.login);
router.use(UserController.handleError);

module.exports = router;
