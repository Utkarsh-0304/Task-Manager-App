import React, { useEffect, useState } from "react";
import List from "./List";
import AddList from "./AddList";
import { DragDropContext } from "react-beautiful-dnd";

function Board() {
  const [lists, setLists] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

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

  async function deleteListFromBoard(listId) {
    const list = await fetch(`http://localhost:3001/lists/${listId}`, {
      method: "DELETE",
    });

    if (list.ok) {
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } else {
      console.error("Failed to delete list");
    }
  }

  async function deleteList(listId) {
    await deleteListFromBoard(listId);
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    // <DragDropContext>
    <div className="list-board">
      {lists.map((list) => {
        return (
          <List
            key={list._id}
            list={list}
            deleteList={deleteList}
            setOpenMenuId={setOpenMenuId}
            openMenuId={openMenuId}
            toggleMenu={toggleMenu}
          />
        );
      })}
      <AddList onAdd={addList} />
    </div>
    // </DragDropContext>
  );
}

export default Board;
