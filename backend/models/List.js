const mongoose = require("mongoose");
const { cardSchema } = require("./Card");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
