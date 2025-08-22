const {
  deleteCard,
  getLists,
  deleteList,
  postCard,
  postList,
  getCards,
  putCard,
} = require("../controllers/lists");

function listRoutes(fastify, opts, done) {
  fastify.get("/lists/:id", getLists);

  fastify.post("/lists/:id", postList);

  fastify.post("/lists/:id/cards", postCard);

  fastify.delete("/lists/:listId/cards/:cardId", deleteCard);

  fastify.delete("/lists/:boardId/:listId", deleteList);

  fastify.get("/lists/:listId/:cardId", getCards);

  fastify.post("/drag_and_drop", putCard);

  done();
}

module.exports = listRoutes;
