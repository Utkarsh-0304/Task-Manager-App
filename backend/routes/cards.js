const { getCards, postCard } = require("../controllers/cards");

function cardRoutes(fastify, opts, done) {
  fastify.get("/cards/:id", getCards);

  fastify.post("/cards/:listId", postCard);

  done();
}

module.exports = cardRoutes;
