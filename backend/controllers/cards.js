const List = require("../models/List");

const getCards = async (req, reply) => {
  const { id } = req.params;

  const list = await List.findOne(id).populate("cards");
  reply.send(list.cards);
};

module.exports = { getCards };
