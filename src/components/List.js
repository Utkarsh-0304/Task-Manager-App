import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";

export default function List({ list }) {
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
      {cards.map((card) => {
        return <Card card={card} onDelete={handleDelete} />;
      })}
      <AddCard onAdd={addCard} />
    </div>
  );
}
