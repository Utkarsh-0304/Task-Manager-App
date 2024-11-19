const User = require("../models/User");

async function handleLogin(req, reply) {
  // const { username, password } = req.body;

  // try {
  //   const user = new User({ username, password });
  //   await user.save();
  //   reply.status(201).send(user);
  // } catch (err) {
  //   reply.status(500).send({ error: "Failed to create a user" });
  // }

  //--------//
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) reply.status(401).send({ message: "No such user found" });

    if (user.password === password)
      reply.status(201).send({ message: "Login successful" });

    reply.status(401).send({ message: "Invalid username or password" });
  } catch (err) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = handleLogin;
