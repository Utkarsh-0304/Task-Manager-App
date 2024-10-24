import React, { useState } from "react";
import List from "./List";
import AddList from "./AddList";
import { DragDropContext } from "react-beautiful-dnd";

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

  function addList(listTitle) {
    const newList = {
      id: Date.now(),
      title: listTitle,
      cards: [],
    };

    setLists([...lists, newList]);
  }

  return (
    <DragDropContext>
      <div className="list-board">
        {lists.map((list) => {
          return <List list={list} />;
        })}
        <AddList onAdd={addList} />
      </div>
    </DragDropContext>
  );
}

export default Board;
