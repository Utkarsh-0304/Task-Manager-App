import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";

async function addCardToList(listId, cardTitle) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/cards/${listId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: cardTitle }),
    }
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    console.error("Error:", data.message);
  }
}

function AddCard({ listId, onAdd }) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    try {
      const newCard = await addCardToList(listId, input);
      setInput("");
      onAdd(newCard);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add a card");
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
      className="bg-black rounded-[3px] p-[10px] mt-[10px]"
    >
      <textarea
        className="w-full border-none rounded-[3px] p-[5px]  text-[1rem] bg-black overflow-x-hidden resize-none whitespace-pre-wrap font-[Verdana] focus:outline-none"
        value={input}
        ref={inputRef}
        onKeyDown={onEnterPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a title or paste a link"
        onInput={handleInput}
      />
      <div className="flex justify-start items-center gap-[0.5rem] [&>button]:mt-[0.5rem] [&>button]: [&>button]:border-none [&>button]:rounded-[3px] [&>button]:px-[6px] [&>button]:py-[12px] [&>button]:cursor-pointer">
        <button
          className="w-[60px] h-[40px] bg-[#427cc2] flex items-center justify-center hover:bg-[#4382cf] disabled:opacity-[0.5]"
          type="submit"
          disabled={!input.trim()}
        >
          Add
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-[#3f3f3f] w-[40px] h-[40px] text-m hover:bg-[#6f717c]"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </div>
    </form>
  ) : (
    <button
      className="mt-[1rem] w-[3rem] h-[3rem]  flex justify-center items-center bg-black rounded-full text-md border-none text-white"
      onClick={handleClick}
    >
      <FaPlus color="white" />
    </button>
  );
}

export default AddCard;
