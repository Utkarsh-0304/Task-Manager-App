import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import Options from "./Options";

function Card({ card, onDelete }) {
  return (
    <div className="mt-[1rem] p-[0.5rem] rounded-[5px] bg-black/60 flex items-center justify-between gap-[0.5rem]  w-full hover:bg-black/50 hover:[&>button]:visible">
      {card.title}
      <DeleteButton card={card} onDelete={onDelete} />
    </div>
  );
}

export default Card;
