import React, { useEffect, useState, useRef } from "react";
import List from "./List";
import AddList from "./AddList";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

function Board() {
  const [lists, setLists] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/lists`);
        const data = await response.json();
        setLists(data);
      } catch (err) {
        console.error("Couldn't fetch lists: ", err);
      }
    }
    fetchLists();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function addList(newList) {
    if (!newList) {
      console.error("New list is undefined or null:", newList);
      return;
    }
    setLists([...lists, newList]);
  }

  async function deleteListFromBoard(listId) {
    const list = await fetch(
      `${import.meta.env.VITE_API_URL}/lists/${listId}`,
      {
        method: "DELETE",
      }
    );

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

  // const getListPosition = (id) =>
  //   lists.findIndex((list) => list.cards.findIndex((c_id) => c_id === id));

  // function handleDragEnd(event) {
  //   const { active, over } = event;

  //   if (!over || active.id === over.id) return;

  //   setLists((prevLists) => {
  //     const originalPos = getListPosition(active.id);

  //     const newPos = getListPosition(over.id);

  //     if (originalPos === -1 || newPos === -1) {
  //       console.error("Invalid positions for drag-and-drop:", {
  //         originalPos,
  //         newPos,
  //       });
  //       return prevLists;
  //     }

  //     return arrayMove([...prevLists], originalPos, newPos);
  //   });
  // }

  return (
    // <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
    <div className="flex flex-row shrink-0 justify-evenly gap-[1.5rem]">
      <NavBar />
      <div className="w-full relative h-[calc(100vh-10vh)] mt-[10vh] flex flex-row ">
        <Sidebar isOpen={isOpen} sidebarRef={sidebarRef} />
        <div className="[&>button]:text-white [&>button]:text-xl [&>button]:border-none [&>button]:rounded-e-[50%] [&>button]:bg-[#00008b] [&>button]:p-[0.3rem] [&>button]:cursor-pointer [&>button]:absolute [&>button]:top-0 [&>button]:left-0 [&>button]:z-2">
          <button onClick={handleClick} className={isOpen ? "open" : ""}>
            {isOpen ? <MdChevronLeft /> : <MdChevronRight />}
          </button>
        </div>
        <div className="m-[1rem] flex flex-row gap-[1.5rem] ">
          {lists.map((list) => (
            // <SortableContext
            //   key={list._id}
            //   items={list.cards.map((card) => card._id)}
            //   strategy={verticalListSortingStrategy}
            // >
            <List
              list={list}
              card={list.cards}
              deleteList={deleteList}
              setOpenMenuId={setOpenMenuId}
              openMenuId={openMenuId}
              toggleMenu={toggleMenu}
            />
          ))}
          <AddList onAdd={addList} />
        </div>
      </div>
    </div>
    // </DndContext>
  );
}

export default Board;
