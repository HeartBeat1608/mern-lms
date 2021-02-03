const router = require("express").Router();

const userRouter = require("./routers/user.routes");

router.use("/users", userRouter);

module.exports = router;
