import React, { useState } from "react";
import List from "./List";

function Board() {
  const [lists, setLists] = useState([
    { id: 1, title: "To-Do", cards: ["Something is not quite right here"] },
    { id: 2, title: "In-Progress", cards: ["Something"] },
    { id: 3, title: "Done", cards: ["Something"] },
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
