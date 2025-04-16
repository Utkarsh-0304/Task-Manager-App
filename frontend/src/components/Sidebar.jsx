import { useState } from "react";

function Sidebar({ isOpen, sidebarRef }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseOver = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div
      ref={sidebarRef}
      className={`absolute bg-white/80 h-full w-[0] rounded-r-[5px] rounded-b-[5px] overflow-hidden z-2 ${
        isOpen ? "w-full max-w-[300px] min-w-[200px]" : ""
      }`}
    >
      <ul className="list-none text-black text-xl line-height-[2rem] w-full [&>.newBoard]:bg-transparent [&>.newBoard]:border-none [&>.newBoard]:w-full [&>.newBoard]:h-full [&>.newBoard]:text-l [&>li]:text-center [&>.hovered]:bg-white">
        <li
          onMouseEnter={() => handleMouseOver("add")}
          onMouseLeave={handleMouseLeave}
          className={hoveredItem === "add" ? "hovered" : ""}
        >
          <button className="newBoard">+ Add New Board</button>
        </li>
        <li
          onMouseEnter={() => handleMouseOver("1")}
          onMouseLeave={handleMouseLeave}
          className={hoveredItem === "1" ? "hovered" : ""}
        >
          Board 1
        </li>
        {/* <li
          key="1"
          onMouseEnter={() => handleMouseOver("home")}
          onMouseLeave={handleMouseLeave}
          className={hoveredItem === "home" ? "hovered" : ""}
        >
          Home
        </li>
        <li
          key="2"
          onMouseEnter={() => handleMouseOver("board")}
          onMouseLeave={handleMouseLeave}
          className={hoveredItem === "board" ? "hovered" : ""}
        >
          Boards
        </li>
        <li
          key="3"
          onMouseEnter={() => handleMouseOver("account")}
          onMouseLeave={handleMouseLeave}
          className={hoveredItem === "account" ? "hovered" : ""}
        >
          Account
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
