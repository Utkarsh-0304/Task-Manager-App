import { React, useState } from "react";
import NavBar from "./components/NavBar";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./home.css";

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      <NavBar />
      <div className="home">
        <Sidebar isOpen={isOpen} />
        <div className="op-sidebar">
          <button onClick={handleClick} className={isOpen ? "open" : ""}>
            {isOpen ? <MdChevronLeft /> : <MdChevronRight />}
          </button>
        </div>
        <Board />
      </div>
    </div>
  );
}

export default Homepage;
