const express = require("express");

// import routes
const r_users = require("./routes/user.routes");

// base router for /api/v1
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

// connect routers here
router.use("/users", r_users);

module.exports = router;
