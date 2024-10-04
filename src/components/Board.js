import React, { useState } from "react";
import List from "./List";

function Board() {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "To-Do",
      cards: [],
    },
    { id: 2, title: "In-Progress", cards: [] },
    { id: 3, title: "Done", cards: [] },
  ]);

  return (
    <div className="list-board">
      {lists.map((list) => {
        return <List list={list} />;
      })}
    </div>
  );
}

export default Board;
