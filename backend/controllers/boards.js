const Board = require("../models/Board");
const { deleteList } = require("./lists.js");

const getBoards = async (req, reply) => {
  try {
    const boards = await Board.find();
    reply.send(boards);
  } catch (err) {
    reply.send("Unable to get boards");
  }
};

const addBoard = async (req, reply) => {
  const { title } = req.body;

  try {
    const newBoard = await Board({ id: Date.now(), title });
    await newBoard.save();
    reply.status(201).send(newBoard);
  } catch (err) {
    reply.status(401).send("Unable to add board");
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
