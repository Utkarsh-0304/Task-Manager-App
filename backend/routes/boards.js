const { getBoards, addBoard, deleteBoard } = require("../controllers/boards");

const boardRoutes = (fastify, opts, done) => {
  fastify.get("/boards", getBoards);
  fastify.post("/boards", addBoard);
  fastify.delete("/boards/:boardId", deleteBoard);
  done();
};

module.exports = boardRoutes;
