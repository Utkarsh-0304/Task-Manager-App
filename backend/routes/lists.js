const {
  deleteCard,
  getLists,
  deleteList,
  postCard,
  postList,
} = require("../controllers/lists");

function listRoutes(fastify, opts, done) {
  fastify.post("/lists", postList);

  fastify.post("/lists/:id/cards", postCard);

  fastify.get("/lists", getLists);

  fastify.delete("/lists/:listId/cards/:cardId", deleteCard);

  fastify.delete("/lists/:listId", deleteList);

  done();
}

module.exports = listRoutes;
