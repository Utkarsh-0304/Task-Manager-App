const handleLogout = require("../controllers/logout");

function logoutRoutes(fastify, opts, done) {
  fastify.get("/logout", handleLogout);
  done();
}

module.exports = logoutRoutes;
