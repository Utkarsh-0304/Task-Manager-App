import React, { useState } from "react";
import DeleteButton from "./DeleteButton";

function Card({ card, onDelete }) {
  // const [isOver, setIsOver] = useState(false);

  return (
    <div className="card">
      {card.title}
      <DeleteButton card={card} onDelete={onDelete} />
    </div>
  );
}

export default Card;
