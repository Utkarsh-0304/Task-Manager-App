const Fastify = require("fastify");
const connectDB = require("./connectDB");
const cors = require("@fastify/cors");

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require("@fastify/formbody"));
fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

connectDB();

fastify.register(require("./routes/lists"));
fastify.register(require("./routes/login"));

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Server started running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
