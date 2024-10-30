import React from "react";
import { MdDelete } from "react-icons/md";

function DeleteButton({ card, onDelete }) {
  return (
    <div className="delete">
      <button onClick={() => onDelete(card._id)}>
        <MdDelete clasName="red" />
      </button>
    </div>
  );
}

export default DeleteButton;
