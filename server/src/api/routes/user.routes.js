const controller = require("../controllers/user.controller");
const middlewares = require("../../middlewares");
const router = require("express").Router();

router.get("/all", middlewares.checkAuth, controller.getAllUsers);
router.post("/new", middlewares.checkAuth, controller.addUser);
router.post("/login", controller.login);

module.exports = router;
