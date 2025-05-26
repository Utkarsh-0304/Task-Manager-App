import React, { useEffect, useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import Options from "./Options";
import { BsThreeDotsVertical } from "react-icons/bs";

async function deleteCardFromList(listId, cardId) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lists/${listId}/cards/${cardId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export default function List({
  boardId,
  list,
  deleteList,
  openMenuId,
  toggleMenu,
}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cards/${list._id}`
      );
      const data = await response.json();
      setCards(data);
    }
    fetchCards();
  }, []);

  function addCard(newCard) {
    setCards([...cards, newCard]);
  }

  async function handleDelete(id) {
    try {
      const updatedCards = await deleteCardFromList(list._id, id);
      setCards(updatedCards);
    } catch (err) {
      console.error("Failed to delete a card", err.message);
    }
  }

  return (
    <div className="p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white/50 h-fit hover:bg-white/60">
      <div className="h-[2rem] w-full text-[1.5rem]  flex justify-between relative">
        {list.title}
        <button
          className={`bg-[9b9eab] p-[0.5rem] border-none text-l rounded-[5px] ${
            openMenuId === list._id ? "isActive" : ""
          }`}
          onClick={() => {
            toggleMenu(list._id);
          }}
        >
          <BsThreeDotsVertical />
        </button>
        {openMenuId === list._id && (
          <Options
            board_id={boardId}
            list_id={list._id}
            deleteList={deleteList}
          />
        )}
      </div>

      <div>
        {cards.map((card) => (
          <Card key={card._id} card={card} onDelete={handleDelete} />
        ))}
      </div>
      <AddCard onAdd={addCard} listId={list._id} />
    </div>
  );
}
