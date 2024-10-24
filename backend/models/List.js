const mongoose = require("mongoose");
const { cardSchema } = require("./Card");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
  createdAt: {
    type: Date,
    default: {
      type: Date,
      default: Date.now(),
    },
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
