import { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import Board from "../components/Board";
import { SkeletonBoard } from "../components/SkeletonBoard";
import "./home.css";
import { MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { BsSend } from "react-icons/bs";

function Homepage() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const auth = useAuth();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  const fetchBoards = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/boards/${auth.user.userId}`
    );
    const data = await response.json();
    setBoards(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  async function handleAPIRequest(message, userId) {
    setShowInput(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/generate_content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, userId }),
        }
      );

      if (response.ok) {
        fetchBoards();
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  }

  const addBoard = async (title) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, userId: auth.user.userId }),
    });

    const newBoard = await response.json();
    setBoards([...boards, newBoard]);
  };

  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    setIsLoading(true);
    addBoard(inputText);
    setIsLoading(false);
    setInputText("");
    setIsOpen(false);
  };

  const handleDelete = async (boardId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/boards/${boardId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete board");
      }

      const data = await response.json();

      setBoards((prevBoards) =>
        prevBoards.filter((board) => board._id !== boardId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <NavBar />
      {selectedBoard ? (
        <Board board={selectedBoard} setSelectedBoard={setSelectedBoard} />
      ) : (
        <div className="flex flex-col m-[1rem] gap-[1rem] ">
          <div className="text-2xl border-b font-semibold">Boards</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <SkeletonBoard />
            ) : (
              boards.map((board) => (
                <div
                  key={board._id}
                  className="group last:hover:inline-block h-[10rem] text-white bg-blue-400 flex flex-row justify-center items-center rounded-md shadow-2xl hover:bg-blue-400 relative"
                >
                  <button
                    onClick={() => setSelectedBoard(board)}
                    className="w-full h-full text-xl"
                  >
                    {board.title}
                  </button>
                  <button
                    onClick={() => handleDelete(board._id)}
                    className="group-hover:flex hidden text-2xl items-center justify-center absolute top-[80%] left-[90%] bottom-[0]"
                  >
                    <MdOutlineDelete color="white" />
                  </button>
                </div>
              ))
            )}

            {isOpen ? (
              <div className="h-[10rem]  border border-black bg-white flex flex-col justify-center items-start pl-6 rounded-md">
                <div className="h-[50%] flex justify-left">
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-[80%] mb-[1rem] text-xl outline-none border-black/40"
                    autoFocus
                    placeholder="Enter board title"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                </div>
                <div className="w-[80%] flex flex-row gap-[1rem]">
                  <button
                    onClick={handleSubmit}
                    className="rounded-md p-[0.5rem] ring-2 ring-blue-500 bg-blue-500/40 hover:bg-blue-500/60 "
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setInputText(""); // Clear the input field on cancel
                    }}
                    className="rounded-md p-[0.5rem] ring-2 ring-red-500 bg-red-500/20 hover:bg-red-500/40 "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[10rem] bg-black flex flex-row text-white justify-center items-center rounded-md hover:bg-black/80">
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full h-full"
                >
                  <div className="font-semibold mb-[0.5rem] text-2xl">+</div>
                  <p className="font-semibold">Create New Board</p>
                </button>
              </div>
            )}
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
                  onClick={() => handleAPIRequest(message, auth.user.userId)}
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
      )}
    </div>
  );
}

export default Homepage;
