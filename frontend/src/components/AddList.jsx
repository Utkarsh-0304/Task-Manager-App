import React, { useState, useRef } from "react";
import { IoIosClose } from "react-icons/io";

async function addListToBoard(id, listTitle) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/lists/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: listTitle }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("List added:", data);
    return data;
  } else {
    console.error("Error:", data.message);
  }
}

export default function AddList({ boardId, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    try {
      const newList = await addListToBoard(boardId, input);
      setInput("");
      onAdd(newList);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to add a list");
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      handleSubmit(e);
    }
  };

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleInput = () => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  };

  return isOpen ? (
    <form
      onSubmit={handleSubmit}
      className="bg-black rounded-[3px] p-[10px] h-fit"
    >
      <textarea
        className="w-full border-none rounded-[3px] p-[5px] text-white text-[1rem] bg-black overflow-x-hidden resize-none whitespace-pre-wrap font-[Verdana] focus:outline-none"
        value={input}
        ref={inputRef}
        onKeyDown={onEnterPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a title"
        onInput={handleInput}
      />
      <div className="flex justify-start items-center gap-[0.5rem] [&>button]:mt-[0.5rem] [&>button]:text-white [&>button]:border-none [&>button]:rounded-[3px] [&>button]:px-[6px] [&>button]:py-[12px] [&>button]:cursor-pointer">
        <button
          type="submit"
          className="w-[60px] h-[40px] bg-[#427cc2] flex items-center justify-center hover:bg-[#4382cf] disabled:opacity-[0.5]"
          disabled={!input.trim()}
        >
          Add
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-[#3f3f3f] w-[40px] h-[40px] text-m hover:bg-[#6f717c]"
          onClick={() => setIsOpen(false)}
        >
          <IoIosClose />
        </button>
      </div>
    </form>
  ) : (
    <button
      className="text-white bg-black/50 w-[50px] h-[50px] rounded-[5px] text-[1.5rem] border-none cursor-pointer"
      onClick={handleClick}
    >
      +
    </button>
  );
}
