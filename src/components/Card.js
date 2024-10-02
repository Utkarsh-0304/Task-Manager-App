import React from "react";

function Card({ list }) {
  if (list.cards[0]) {
    return <input type="text" />;
  }
}

export default Card;
