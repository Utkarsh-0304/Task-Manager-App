import { useState } from "react";

function Sidebar({ isOpen }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseOver = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div
      className={`absolute bg-[#00008b99] h-full w-[0] rounded-r-[5px] rounded-b-[5px] overflow-hidden z-[1]${
        isOpen ? "w-3/10 max-w-[300px] min-w-[200px]" : ""
      }`}
    >
      <ul className="list-none text-white text-xl line-height-[2rem] w-full [&>.newBoard]:bg-transparent [&>.newBoard]:border-none [&>.newBoard]:w-full [&>.newBoard]:h-full [&>.newBoard]:text-l [&>li]:text-center [&>.hovered]:bg-[#313030]">
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
