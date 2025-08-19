const Fastify = require("fastify");
const connectDB = require("./connectDB");
const cors = require("@fastify/cors");
require("dotenv").config();

const fastify = Fastify();

const PORT = process.env.PORT || 3000;

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cookie"), {
  secret: process.env.JWT_SECRET,
  hook: "onRequest",
  parseOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  },
});
fastify.register(cors, {
  origin: [
    "http://localhost:3000",
    "https://task-manager-app-nu4y.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies
});

fastify.register(require("./routes/ping"));
fastify.register(require("./routes/verify"));
fastify.register(require("./routes/boards"));
fastify.register(require("./routes/lists"));
fastify.register(require("./routes/cards"));
fastify.register(require("./routes/login"));
fastify.register(require("./routes/logout"));
fastify.register(require("./routes/signup"));
fastify.register(require("./routes/generateContent"));

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
