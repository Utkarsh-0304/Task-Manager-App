const List = require("../models/List");

async function deleteCard(req, reply) {
  const { listId, cardId } = req.params;

  try {
    const list = await List.findById(listId);
    if (!list) return reply.status(404).send({ error: "List not found" });

    list.cards.pull({ _id: cardId });
    await list.save();
    reply.send(list);
  } catch (err) {
    reply.status(500).send({ error: "Failed to delete a card" });
  }
}

async function getLists(req, reply) {
  try {
    const lists = await List.find();
    reply.send(lists);
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch lists" });
  }
}

async function deleteList(req, reply) {
  const { listId } = req.params;

  try {
    const list = await List.findByIdAndDelete(listId);
    if (!list) {
      return reply.status(404).send({ error: "List not found" });
    }
    reply.status(200).send({ list });
  } catch (err) {
    console.error("Error deleting list:", err);
    reply.status(500).send({ error: "Failed to delete a list" });
  }
}

async function postCard(req, reply) {
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
}

async function postList(req, reply) {
  const { title } = req.body;

  try {
    const newList = new List({ title });
    await newList.save();
    reply.status(201).send(newList);
  } catch (err) {
    reply.status(500).send({ error: "Failed to create list" });
  }
}

module.exports = { deleteCard, getLists, deleteList, postCard, postList };
