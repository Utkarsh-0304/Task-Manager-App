const Board = require("../models/Board");

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

module.exports = { getBoards, addBoard };
