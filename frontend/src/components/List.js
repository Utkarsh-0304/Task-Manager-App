import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

export default function List({ list, index }) {
  const [cards, setCards] = useState(list.cards);

  function addCard(cardTitle) {
    const newCard = {
      id: Date.now(),
      title: cardTitle,
    };
    setCards([...cards, newCard]);
  }

  function handleDelete(id) {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
  }

  return (
    <div className="list">
      <div className="list-title">{list.title}</div>
      <Droppable droppableId={list.id}>
        {(provider) => (
          <div
            className="card-list"
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {cards.map((card, index) => (
              <Card card={card} index={index} onDelete={handleDelete} />
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
      <AddCard onAdd={addCard} />
    </div>
  );
}
