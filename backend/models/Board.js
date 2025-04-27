const mongoose = require("mongoose");
const { listSchema } = require("./List");

const boardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // lists: [listSchema],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
