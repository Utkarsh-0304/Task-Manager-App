const List = require("../models/List");
const Card = require("../models/Card");

const getCards = async (req, reply) => {
  const { id } = req.params;

  const list = await List.findById(id).populate("cards");
  reply.send(list.cards);
};

const postCard = async (req, reply) => {
  const { listId } = req.params;
  const { title } = req.body;

  try {
    const list = await List.findById(listId);

    const newCard = new Card({ title });
    await newCard.save();

    list.cards.push(newCard._id);
    await list.save();

    reply.status(201).send(newCard);
  } catch (err) {
    reply.status(500).send("Failed to create a card");
  }
};

module.exports = { getCards, postCard };
