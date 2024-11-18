const handleLogin = require("../controllers/login.js");

function loginRoutes(fastify, opts, done) {
  fastify.post("/login", handleLogin);
  done();
}

module.exports = loginRoutes;
