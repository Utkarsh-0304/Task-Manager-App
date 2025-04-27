import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import Options from "./Options";
import { BsThreeDotsVertical } from "react-icons/bs";

async function deleteCardFromList(listId, cardId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/lists/${listId}/cards/${cardId}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    console.error("Error: ", errorData.message);
  }
}

export default function List({
  list,
  card,
  deleteList,
  openMenuId,
  toggleMenu,
}) {
  const [cards, setCards] = useState(card);

  function addCard(newCard) {
    setCards([...cards, newCard]);
  }

  async function handleDelete(id) {
    const updatedList = await deleteCardFromList(list._id, id);
    if (updatedList) {
      setCards(updatedList.cards);
    }
  }

  return (
    <div className="p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white/50 h-fit hover:bg-white/60">
      <div className="h-[2rem] w-full text-[1.5rem] text-white flex justify-between relative">
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
          <Options id={list._id} deleteList={deleteList} />
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
