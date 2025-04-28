const mongoose = require("mongoose");
const { listSchema } = require("./List");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
