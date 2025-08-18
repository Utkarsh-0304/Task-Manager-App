const jwt = require("jsonwebtoken");

require("dotenv").config();

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
    },
    process.env.JWT_SECRET
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { setUser, getUser };
