import React, { useState } from "react";
import List from "./List";

function Board() {
  const [lists, setLists] = useState([
    { id: 1, title: "To-Do", cards: ["Nothing"] },
    { id: 2, title: "In-Progress", cards: ["Nothing"] },
    { id: 3, title: "Done", cards: ["Nothing"] },
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
