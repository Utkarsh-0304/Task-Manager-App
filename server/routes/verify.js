const { getUser } = require("../service/auth");

const verifyRoute = (fastify, opts, done) => {
  fastify.get("/verify", async function (req, reply) {
    const token = req.cookies.uid;
    const user = getUser(token);

    if (!user) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    return reply.send({ message: "User verified", user });
  });
  done();
};

module.exports = verifyRoute;
