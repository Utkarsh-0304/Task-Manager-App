const Fastify = require("fastify");
const connectDB = require("./connectDB");
const cors = require("@fastify/cors");

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require("@fastify/formbody"));
fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies
});
fastify.register(require("@fastify/cookie"));

connectDB();

fastify.register(require("./routes/lists"));
fastify.register(require("./routes/login"));
fastify.register(require("./routes/logout"));
fastify.register(require("./routes/signup"));

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
