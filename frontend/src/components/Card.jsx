import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import Options from "./Options";
// import { Draggable } from "react-beautiful-dnd";

function Card({ card, onDelete, index }) {
  return (
    // <Draggable draggableId={card.id.toString()} index={index}>
    //   {(provided) => {
    //     return (
    <div
      class="mt-[1rem] p-[0.5rem] rounded-[5px] bg-black/60 flex items-center justify-between gap-[0.5rem] text-white w-full hover:bg-black/50 hover:[&>button]:visible"
      // {...provided.draggableProps}
      // {...provided.dragHandleProps}
      // ref={provided.innerRef}
    >
      {card.title}
      <DeleteButton card={card} onDelete={onDelete} />
    </div>
  );
  //   }}
  // </Draggable>
  // );
}

export default Card;
