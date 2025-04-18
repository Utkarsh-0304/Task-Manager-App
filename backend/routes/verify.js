const { getUser } = require("../service/auth");

const verifyRoute = (fastify, opts, done) => {
  fastify.post("/verify", async function (req, reply) {
    const token = req.cookie.uid;
    const user = getUser(token);

    if (!user) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    return reply.send({ message: "User verified", user });
  });
  done();
};

module.exports = verifyRoute;
