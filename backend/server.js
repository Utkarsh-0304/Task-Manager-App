const Fastify = require("fastify");
const connectDB = require("./connectDB");
const cors = require("@fastify/cors");

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cookie"), {
  secret: "supersecret",
  hook: "onRequest",
  parseOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // IMPORTANT: false for localhost testing
  },
});
fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies
});

fastify.register(require("./routes/lists"));
fastify.register(require("./routes/login"));
fastify.register(require("./routes/logout"));
fastify.register(require("./routes/signup"));

const start = async () => {
  try {
    await connectDB();
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server started running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
