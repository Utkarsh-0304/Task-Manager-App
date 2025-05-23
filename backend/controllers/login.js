const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleLogin(req, reply) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return reply.status(401).send({ message: "No such user found" });

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = setUser(user);
      reply.setCookie("uid", token, {
        path: "/", // Cookie is accessible on all routes
        httpOnly: true, // Prevents client-side access
        secure: true, // Set to `true` if using HTTPS
        maxAge: 3600, // Cookie expires in 1 hour
        sameSite: "None", // Prevents CSRF attacks
      });
      return reply.status(201).send({ message: "Login successful" });
    } else {
      return reply
        .status(401)
        .send({ message: "Invalid username or password" });
    }
  } catch (err) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = handleLogin;
