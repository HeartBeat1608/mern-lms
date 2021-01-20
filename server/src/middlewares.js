const jwt = require("./api/utils/jwt");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

/* eslint-disable no-unused-vars */
function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new Error("Authorization header required."));

  const authToken = authHeader.split(/bearer/i)[1].trim();
  if (!authToken) return next(new Error("Missing Authorization token."));

  const payload = jwt.decodeToken(authToken);
  if (!payload) return next(new Error("Invalid Token provided."));

  req.user = payload;
  next();
}

module.exports = {
  notFound,
  errorHandler,
  checkAuth,
};
