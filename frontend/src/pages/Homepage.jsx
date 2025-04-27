import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Board from "../components/Board";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/boards`);
      const data = await response.json();
      console.log(data);
      setBoards(data);
    };
    fetchBoards();
  }, []);

  const addBoard = async (title) => {
    const newBoard = await fetch(`${import.meta.env.VITE_API_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setBoards([...boards, newBoard]);
  };

  const navigate = useNavigate();
  return (
    <div className="app">
      <NavBar />
      <div className="flex flex-row gap-[1.5rem] m-[calc(100vh-90vh)]">
        {boards.map((board) => (
          <div
            key={board._id}
            className="w-[250px] h-[150px] bg-blue-400/40 flex flex-row justify-center items-center  rounded-2xl"
          >
            <button
              onClick={() => navigate("/board")}
              className=" w-[250px] h-[150px] text-white "
            >
              {board.title}
            </button>
          </div>
        ))}
        <div className="w-[250px] h-[150px] bg-blue-400/40 flex flex-row justify-center items-center rounded-2xl">
          <button
            onClick={() => addBoard("sample board")}
            className=" w-[250px] h-[150px] text-white "
          >
            Add Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
