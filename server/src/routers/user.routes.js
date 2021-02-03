const userController = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/all", userController.getAllUsers);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
