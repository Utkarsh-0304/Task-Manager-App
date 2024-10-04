import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";

export default function List({ list }) {
  const [cards, setCards] = useState(list.cards);

  function addCard(cardTitle) {
    const newCard = cardTitle;
    setCards([...cards, newCard]);
  }

  return (
    <div className="list">
      <div className="list-title">{list.title}</div>
      {cards.map((card) => {
        return <Card card={card} />;
      })}
      <AddCard onAdd={addCard} />
    </div>
  );
}
