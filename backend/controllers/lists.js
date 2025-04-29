const List = require("../models/List");
const Board = require("../models/Board");

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
  const { id } = req.params;

  try {
    const board = await Board.findById(id).populate("lists");
    // console.log(board.lists);
    reply.send(board.lists);
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch lists" });
  }
}

async function deleteList(req, reply) {
  const { boardId, listId } = req.params;

  try {
    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        $pull: { lists: listId },
      },
      { new: true }
    );

    if (!board) {
      return reply.status(404).send({ error: "Board not found" });
    }

    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
      return reply.status(404).send({ error: "List not found" });
    }

    const updatedBoard = await Board.findById(boardId).populate("lists");

    reply.status(200).send(updatedBoard.lists);
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
  const { id } = req.params;
  const { title } = req.body;

  try {
    const board = await Board.findById(id);

    const newList = new List({ title });
    await newList.save();

    board.lists.push(newList._id);
    await board.save();

    reply.status(201).send(newList);
  } catch (err) {
    reply.status(500).send({ error: "Failed to create list" });
  }
}

module.exports = { deleteCard, getLists, deleteList, postCard, postList };
