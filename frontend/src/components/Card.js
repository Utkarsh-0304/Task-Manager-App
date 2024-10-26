import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import { Draggable } from "react-beautiful-dnd";

function Card({ card, onDelete, index }) {
  return (
    // <Draggable draggableId={card.id.toString()} index={index}>
    //   {(provided) => {
    //     return (
    <div
      className="card"
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
