import { React, useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./home.css";

function Homepage() {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      <NavBar />
      <div className="relative h-[calc(100vh-10vh)] mt-[10vh] flex flex-row ">
        <Sidebar isOpen={isOpen} sidebarRef={sidebarRef} />
        <div className="[&>button]:text-white [&>button]:text-xl [&>button]:border-none [&>button]:rounded-e-[50%] [&>button]:bg-[#00008b] [&>button]:p-[0.3rem] [&>button]:cursor-pointer [&>button]:absolute [&>button]:top-0 [&>button]:left-0 [&>button]:z-2">
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
