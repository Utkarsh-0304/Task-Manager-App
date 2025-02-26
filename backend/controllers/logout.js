async function logoutController(req, reply) {
  reply.clearCookie("uid");
  reply.send({ message: "Logout successful" });
}

module.exports = logoutController;
