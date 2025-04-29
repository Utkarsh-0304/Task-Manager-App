import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Board from "../components/Board";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/boards`);
      const data = await response.json();
      setBoards(data);
    };
    fetchBoards();
  }, []);

  const addBoard = async (title) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newBoard = await response.json();
    setBoards([...boards, newBoard]);
  };

  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    addBoard(inputText);
    setIsOpen(false);
  };

  return (
    <div className="app">
      <NavBar />
      {selectedBoard ? (
        <Board board={selectedBoard} setSelectedBoard={setSelectedBoard} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-[calc(10vh)] ">
          {boards.map((board) => (
            <div
              key={board._id}
              className="h-[10rem] text-white bg-blue-400/40 flex flex-row justify-center items-center rounded-md shadow-2xl hover:bg-blue-400/60"
            >
              <button
                onClick={() => setSelectedBoard(board)}
                className="w-full h-full"
              >
                {board.title}
              </button>
            </div>
          ))}
          {isOpen ? (
            <div className="h-[10rem] text-black bg-white/80 flex flex-col justify-center items-center rounded-md ">
              <div className="h-[50%] flex flex-col justify-center ">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-[80%] mb-[1rem] text-xl outline-none  border-black/40"
                  autofocus
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
                  className="rounded-md p-[0.5rem] ring-2 ring-blue-500 bg-blue-500/40 hover:bg-blue-500/60 text-white"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-[0.5rem] ring-2 ring-red-500 bg-red-500/20 hover:bg-red-500/40 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[10rem] text-white bg-black/40 flex flex-row justify-center items-center rounded-md hover:bg-black/60">
              <button onClick={() => setIsOpen(true)} className="w-full h-full">
                <div className="font-semibold mb-[0.5rem] text-2xl">+</div>
                <p className="font-semibold">Create New Board</p>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;
