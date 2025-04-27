import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import Options from "./Options";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ card, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="mt-[1rem] p-[0.5rem] rounded-[5px] bg-black/60 flex items-center justify-between gap-[0.5rem] text-white w-full hover:bg-black/50 hover:[&>button]:visible"
    >
      {card.title}
      <DeleteButton card={card} onDelete={onDelete} />
    </div>
  );
}

export default Card;
