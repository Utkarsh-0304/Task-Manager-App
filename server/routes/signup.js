const handleSignup = require("../controllers/signup");

const signupRoutes = (fastify, opts, done) => {
  fastify.post("/signup", handleSignup);
  done();
};

module.exports = signupRoutes;
