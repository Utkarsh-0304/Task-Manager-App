const {
  getCards,
  postCard,
  postDesc,
  getDesc,
} = require("../controllers/cards");

function cardRoutes(fastify, opts, done) {
  fastify.get("/cards/:id", getCards);

  fastify.post("/cards/:listId", postCard);

  fastify.post("/card/:cardId", postDesc);

  fastify.get("/card/:cardId", getDesc);

  done();
}

module.exports = cardRoutes;
