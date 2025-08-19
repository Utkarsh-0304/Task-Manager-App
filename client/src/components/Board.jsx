import { useEffect, useState, useRef } from "react";
import List from "./List";
import AddList from "./AddList";
import { SkeletonList } from "./SkeletonList";
import { MdChevronLeft } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { BsSend } from "react-icons/bs";

function Board({ board, setSelectedBoard }) {
  const [lists, setLists] = useState(board?.lists || []);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openCardListId, setOpenCardListId] = useState(null);
  const [message, setMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const textareaRef = useRef(null);

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

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  async function handleAPIRequest(message) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/generate_content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );
    console.log(response);
    const res = await response.json();
    console.log(res);
  }

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  return (
    <div className="flex flex-col shrink-0 justify-evenly overflow-y-hidden h-[90vh]">
      <div
        className="flex flex-row justify-left items-center w-60 text-[#ccc] cursor-pointer underline underline-offset-2"
        onClick={() => setSelectedBoard(null)}
      >
        <MdChevronLeft color="gray" />
        Back to Boards
      </div>
      <div className="w-full relative h-[90vh] flex flex-row">
        <div className="m-[1rem] flex flex-row gap-[1.5rem]">
          {isLoading ? (
            <SkeletonList />
          ) : lists.length == 0 ? (
            <div className="italic text-[#bbb]">
              Click here to add some lists
            </div>
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
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.1 }}
            className="text-white flex justify-between items-center absolute bg-blue-400 right-10 bottom-10 w-[35vw] p-[1rem] rounded-full z-10 gap-[0.5rem]"
          >
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              ref={textareaRef}
              className="relative flex items-center justify-center bg-white/90 w-[90%] rounded-full text-lg text-black outline-none p-[0.8rem] resize-none"
            />
            <div
              className="bg-white w-[2rem] h-[2rem] rounded-full flex justify-center items-center p-[0.5rem] cursor-pointer"
              onClick={() => handleAPIRequest(message)}
            >
              <BsSend size={20} color="black" />
            </div>
            <div
              className="flex text-black items-center justify-center rounded-full bg-white w-[2rem] h-[2rem] cursor-pointer"
              onClick={() => {
                setShowInput(false);
                setMessage("");
              }}
            >
              <RxCross1 />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!showInput && (
        <button
          className="absolute right-10 bottom-10 bg-blue-400 text-white rounded-full p-3 shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          What's on your mind?
        </button>
      )}
    </div>
  );
}

export default Board;
