const { getBoards, addBoard } = require("../controllers/boards");

const boardRoutes = (fastify, opts, done) => {
  fastify.get("/boards", getBoards);
  fastify.post("/boards", addBoard);
  done();
};

module.exports = boardRoutes;
