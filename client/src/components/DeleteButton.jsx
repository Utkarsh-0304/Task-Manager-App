import React from "react";
import { MdDelete } from "react-icons/md";

function DeleteButton({ card, onDelete }) {
  return (
    <button
      className="bg-[#0079bf] p-[0.3rem] rounded-[3px] border-none text-l  flex justify-center items-center invisible"
      onClick={() => onDelete(card._id)}
    >
      <MdDelete color="white" />
    </button>
  );
}

export default DeleteButton;
