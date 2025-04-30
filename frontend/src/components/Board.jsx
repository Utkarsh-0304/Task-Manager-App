import React, { useEffect, useState, useRef } from "react";
import List from "./List";
import AddList from "./AddList";
import NavBar from "./NavBar";
import { SkelatonList } from "./SkelatonList";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Board({ board, setSelectedBoard }) {
  const [lists, setLists] = useState(board?.lists || []);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lists/${board._id}`
        );

        const data = await response.json();

        setLists(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Couldn't fetch lists: ", err);
        setIsLoading(false);
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

  async function deleteListFromBoard(boardId, listId) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lists/${boardId}/${listId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedLists = await response.json();
      setLists(updatedLists);
    } else {
      console.error("Failed to delete list");
    }
  }

  async function deleteList(boardId, listId) {
    await deleteListFromBoard(boardId, listId);
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="flex flex-col shrink-0 justify-evenly gap-[1.5rem]">
      <NavBar />
      <div className="w-full relative h-[calc(100vh-10vh)] mt-[10vh] flex flex-row ">
        <div className="[&>button]:text-white [&>button]:text-2xl [&>button]:border-none [&>button]:rounded-e-[50%] [&>button]:bg-[#00008b] [&>button]:p-[0.3rem] [&>button]:cursor-pointer [&>button]:absolute [&>button]:top-0 [&>button]:left-0 [&>button]:z-2">
          <button onClick={() => setSelectedBoard(null)}>
            <MdChevronLeft />
          </button>
        </div>
        <div className="m-[1rem] flex flex-row gap-[1.5rem]">
          {isLoading ? (
            <SkelatonList />
          ) : (
            lists.map((list) => (
              <List
                boardId={board._id}
                key={list._id}
                list={list}
                deleteList={deleteList}
                setOpenMenuId={setOpenMenuId}
                openMenuId={openMenuId}
                toggleMenu={toggleMenu}
              />
            ))
          )}
          <AddList boardId={board._id} onAdd={addList} />
        </div>
      </div>
    </div>
  );
}

export default Board;
