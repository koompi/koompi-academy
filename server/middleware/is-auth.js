const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PRIVATE_KEY } = process.env;

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
