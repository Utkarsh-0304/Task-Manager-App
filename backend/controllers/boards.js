const Board = require("../models/Board");
const { deleteList } = require("./lists.js");

const getBoards = async (req, reply) => {
  const { userId } = req.params;

  try {
    const boards = await Board.find({ created_by: String(userId) });
    reply.send(boards);
  } catch (err) {
    reply.send("Unable to get boards");
  }
};

const addBoard = async (req, reply) => {
  const { title, userId } = req.body;

  try {
    const newBoard = await Board({
      title,
      created_by: String(userId),
    });
    await newBoard.save();
    reply.status(201).send(newBoard);
  } catch (err) {
    console.error("ERROR ADDING BOARD:", err);

    reply
      .status(500)
      .send({ message: "Unable to add board", error: err.message });
  }
};

const deleteBoard = async (req, reply) => {
  const { boardId } = req.params;

  const board = await Board.findById(boardId);
  if (!board) {
    reply.send("Board not found");
  }

  for (const listId of board.lists) {
    await deleteList({ params: { boardId, listId } }, reply);
  }

  const deletedBoard = await Board.findByIdAndDelete(boardId);

  reply.status(200).send(deletedBoard);
};

module.exports = { getBoards, addBoard, deleteBoard };
