const Fastify = require("fastify");
const List = require("./models/List");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("fastify-cors");

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require("@fastify/formbody"));
// fastify.register(cors, {});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect MongoDB", err));

fastify.post("/lists", async (req, reply) => {
  const { title } = req.body;

  try {
    const newList = new List({ title });
    //await newList.save();
    reply.status(201).send(newList);
  } catch (err) {
    reply.status(500).send({ error: "Failed to create list" });
  }
});

fastify.post("/lists/:id/cards", async (req, reply) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const list = await List.findById(id);
    if (!list) {
      return reply.status(404).send({ error: "List not found" });
    }
    const newCard = { title };
    list.cards.push(newCard);
    await list.save();

    reply.status(201).send(list);
  } catch (err) {
    reply.status(500).send({ error: "Failed to add a card" });
  }
});

fastify.get("/lists", async (req, reply) => {
  try {
    const lists = await List.find();
    reply.send(lists);
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch lists" });
  }
});

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
