import React from "react";
import { MdDelete } from "react-icons/md";

interface Card {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

function DeleteButton({ card, onDelete }: { card: Card, onDelete: (cardId: string) => void }) {
  return (
    <button
      className="bg-[#0079bf] p-[0.3rem] rounded-[3px] border-none text-l  flex justify-center items-center group-hover:visible invisible"
      onClick={() => onDelete(card._id)}
    >
      <MdDelete color="white" />
    </button>
  );
}

export default DeleteButton;
