const List = require("../models/List");
const Board = require("../models/Board");
const Card = require("../models/Card");

async function deleteCard(req, reply) {
  const { listId, cardId } = req.params;

  try {
    const list = await List.findByIdAndUpdate(
      listId,
      {
        $pull: { cards: cardId },
      },
      { new: true }
    );
    if (!list) return reply.status(404).send({ error: "List not found" });

    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) reply.send("Card not found");

    const updatedList = await List.findById(listId).populate("cards");
    reply.send(updatedList.cards);
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

    const list = await List.findById(listId);
    await Card.deleteMany({ _id: { $in: list.cards } });

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

const getCards = async (req, reply) => {
  const { listId, cardId } = req.params;

  const list = await List.findOne(listId).populate("cards");
  if (!list) reply.send("List not found");
  const cards = list.cards;
  reply.send(cards);
};

const putCard = async (req, reply) => {
  const { destinationListId, sourceListId, cardId } = req.body;

  await List.findByIdAndUpdate(sourceListId, {
    $pull: { cards: cardId },
  });

  const destList = await List.findById(destinationListId);
  const card = await Card.findById(cardId);
  destList.cards.push(card._id);
  await destList.save();
};

module.exports = {
  deleteCard,
  getLists,
  deleteList,
  postCard,
  postList,
  getCards,
  putCard,
};
