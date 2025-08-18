const pingRoute = (fastify, opts, done) => {
  fastify.get("/ping", async (req, reply) => {
    reply.status(201).send({ message: "Backend pinged" });
  });
  done();
};

module.exports = pingRoute;
