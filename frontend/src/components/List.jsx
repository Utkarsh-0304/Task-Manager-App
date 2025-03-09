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
    <div className="list">
      <div className="list-title">
        {list.title}
        <button
          onClick={() => {
            toggleMenu(list._id);
          }}
          className={openMenuId === list._id ? "isActive" : ""}
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
        className="card-list"
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
