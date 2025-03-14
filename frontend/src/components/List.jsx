import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import Options from "./Options";
// import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { Droppable } from "react-beautiful-dnd";

async function deleteCardFromList(listId, cardId) {
  const response = await fetch(
    `http://localhost:3001/lists/${listId}/cards/${cardId}`,
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

export default function List({ list, deleteList, openMenuId, toggleMenu }) {
  const [cards, setCards] = useState(list.cards);
  // const [isActive, setIsActive] = useState(false);

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
      {/* <Droppable droppableId={list.id}>
        {(provider) => (
        )}
      </Droppable> */}
      <div
      // ref={provider.innerRef}
      // {...provider.droppableProps}
      >
        {cards.map((card, index) => (
          <Card card={card} index={index} onDelete={handleDelete} />
        ))}
        {/* {provider.placeholder} */}
      </div>
      <AddCard onAdd={addCard} listId={list._id} />
    </div>
  );
}
