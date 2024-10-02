import React from "react";
import AddCard from "./AddCard";

function addCard() {}

function handleClick() {}

export default function List({ list }) {
  return (
    <div className="list">
      <div className="list-title">{list.title}</div>
      <AddCard />
      <button onClick={handleClick}>+</button>
    </div>
  );
}
