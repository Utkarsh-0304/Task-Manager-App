const User = require("../models/User");

async function handleSignup(req, reply) {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return reply.status(409).send({ message: "User already exists" });
    }

    const user = new User({
      username,
      password,
    });
    await user.save();
    console.log("User created successfully", user);
    reply.status(201).send({ message: "User created successfully", user });
  } catch (err) {
    console.error("User creation unsuccessful", err);
    reply.status(500).send({ message: "User creation unsuccessful" });
  }
}

module.exports = handleSignup;
