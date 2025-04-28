const {
  deleteCard,
  getLists,
  deleteList,
  postCard,
  postList,
} = require("../controllers/lists");

function listRoutes(fastify, opts, done) {
  fastify.get("/lists/:id", getLists);

  fastify.post("/lists/:id", postList);

  fastify.post("/lists/:id/cards", postCard);

  fastify.delete("/lists/:listId/cards/:cardId", deleteCard);

  fastify.delete("/lists/:listId", deleteList);

  done();
}

module.exports = listRoutes;
