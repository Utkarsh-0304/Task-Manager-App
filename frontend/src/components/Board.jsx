import { useEffect, useState, useRef } from "react";
import List from "./List";
import AddList from "./AddList";
import { SkeletonList } from "./SkeletonList";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Board({ board, setSelectedBoard }) {
  const [lists, setLists] = useState(board?.lists || []);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openCardListId, setOpenCardListId] = useState(null);
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

  useEffect(() => {
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
      <div className="w-full relative h-[calc(100vh-10vh)] flex flex-row ">
        <div className="[&>button]: [&>button]:text-2xl [&>button]:border-none [&>button]:rounded-e-[50%] [&>button]:bg-[#000000] [&>button]:p-[0.3rem] [&>button]:cursor-pointer [&>button]:absolute [&>button]:top-0 [&>button]:left-0 [&>button]:z-2">
          <button onClick={() => setSelectedBoard(null)}>
            <MdChevronLeft color="white" />
          </button>
        </div>
        <div className="m-[1rem] flex flex-row gap-[1.5rem]">
          {isLoading ? (
            <SkeletonList />
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
                openCardListId={openCardListId}
                setOpenCardListId={setOpenCardListId}
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
