const jwt = require("jsonwebtoken");
const secretKey = "supersecret";

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secretKey);
}

module.exports = { setUser, getUser };
