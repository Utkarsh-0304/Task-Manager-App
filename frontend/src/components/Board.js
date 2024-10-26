import React, { useEffect, useState } from "react";
import List from "./List";
import AddList from "./AddList";
import { DragDropContext } from "react-beautiful-dnd";

function Board() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await fetch("http://localhost:3001/lists");
        const data = await response.json();
        console.log(data);
        setLists(data);
      } catch (err) {
        console.error("Couldn't fetch lists: ", err);
      }
    }
    fetchLists();
  }, []);

  function addList(newList) {
    if (!newList) {
      console.error("New list is undefined or null:", newList);
      return;
    }
    setLists([...lists, newList]);
  }

  return (
    // <DragDropContext>
    <div className="list-board">
      {lists.map((list) => {
        return <List list={list} />;
      })}
      <AddList onAdd={addList} />
    </div>
    // </DragDropContext>
  );
}

export default Board;
