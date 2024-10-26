const mongoose = require("mongoose");
const { cardSchema } = require("./Card");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
