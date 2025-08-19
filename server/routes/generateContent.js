const { generateContent } = require("../controllers/generateContent");

function generateContentRoutes(fastify, opts, done) {
  fastify.post("/generate_content", generateContent);
  done();
}

module.exports = generateContentRoutes;
