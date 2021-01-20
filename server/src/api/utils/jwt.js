const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(JSON.parse(JSON.stringify(payload)), process.env.JWT_SECRET, {
    expiresIn: "12h",
    encoding: "utf8",
    algorithm: "HS256",
  });
};

const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  generateToken,
  decodeToken,
};
