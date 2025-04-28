import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Board from "../components/Board";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
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

  return (
    <div className="app">
      <NavBar />
      {selectedBoard ? (
        <Board board={selectedBoard} setSelectedBoard={setSelectedBoard} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-[calc(10vh)]">
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
          <div className="h-[10rem] text-white bg-black/40 flex flex-row justify-center items-center rounded-md hover:bg-black/60">
            <button
              onClick={() => addBoard("sample board")}
              className="w-full h-full"
            >
              <div className="font-semibold mb-[0.5rem] text-2xl">+</div>
              <p className="font-semibold">Create New Board</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
