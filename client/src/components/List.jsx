import React, { useEffect, useRef, useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import Options from "./Options";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDroppable } from "@dnd-kit/core";
import { toast } from "sonner";

export default function List({
  boardId,
  list,
  cards,
  deleteList,
  setLists,
  openCardListId,
  setOpenCardListId,
  setIsModalOpen,
  setCurrCard,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const delRef = useRef(null);
  const { setNodeRef } = useDroppable({
    id: list._id,
  });

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (delRef.current && !delRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  function addCard(newCard) {
    setLists((prevLists) =>
      prevLists.map((l) =>
        l._id === list._id ? { ...l, cards: [...l.cards, newCard] } : l
      )
    );
  }

  async function handleDelete(cardId) {


    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${list._id}/cards/${cardId}`,
        { method: "DELETE" }
      );

      setLists((prevLists) =>
        prevLists.map((l) =>
          l._id === list._id
            ? { ...l, cards: l.cards.filter((c) => c._id !== cardId) }
            : l
        )
      );

      toast.success("Card Deleted successfully")
    } catch (err) {
      console.error("Failed to delete card:", err);
    }
  }

  return (
    <div
      ref={setNodeRef}
      className="p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white h-fit"
    >
      <div className="h-[2rem] w-full text-[1.5rem] text-[#343A40] font-semibold flex justify-between relative">
        {list.title}
        <button onClick={() => toggleMenu(list._id)}>
          <BsThreeDotsVertical color="#ADB5BD" />
        </button>
        {openMenuId === list._id && (
          <Options
            board_id={boardId}
            list_id={list._id}
            deleteList={deleteList}
            ref={delRef}
          />
        )}
      </div>

      <div className="mt-4">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onDelete={handleDelete}
            listId={list._id}
            setIsModalOpen={setIsModalOpen}
            setCurrCard={setCurrCard}
          />
        ))}
      </div>
      <AddCard
        onAdd={addCard}
        listId={list._id}
        setOpenCardListId={setOpenCardListId}
        openCardListId={openCardListId}
      />
    </div>
  );
}
