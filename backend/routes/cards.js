const { getCards } = require("../controllers/cards");

function cardRoutes(fastify, opts, done) {
  fastify.get("/cards/:id", getCards);
  done();
}

module.exports = cardRoutes;
