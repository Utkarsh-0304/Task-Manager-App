import { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

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

function AddCard({ listId, onAdd, openCardListId, setOpenCardListId }) {
  const [input, setInput] = useState("");
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
    setOpenCardListId(listId);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleInput = () => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  };

  return openCardListId === listId ? (
    <form
      onSubmit={handleSubmit}
      className="rounded-[3px] p-[10px] mt-[10px] border-1 border-[#DFE1E6] bg-[#EFF2F5]"
    >
      <textarea
        className="w-full border-none rounded-[3px] p-[5px]  text-[1rem] overflow-x-hidden resize-none whitespace-pre-wrap font-[Verdana] focus:outline-none text-black"
        value={input}
        ref={inputRef}
        onKeyDown={onEnterPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a title or paste a link"
        onInput={handleInput}
      />
      <div className="flex justify-start items-center gap-[0.5rem] [&>button]:mt-[0.5rem] [&>button]: [&>button]:border-none [&>button]:rounded-[3px] [&>button]:px-[6px] [&>button]:py-[12px] [&>button]:cursor-pointer">
        <button
          className="w-[60px] h-[40px] bg-[#427cc2] flex items-center justify-center hover:bg-[#4382cf] disabled:opacity-[0.5] text-white"
          type="submit"
          disabled={!input.trim()}
        >
          Add
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-[#3f3f3f] text-white w-[40px] h-[40px] text-m hover:bg-[#6f717c]"
          onClick={() => setOpenCardListId(null)}
        >
          <RxCross2 />
        </button>
      </div>
    </form>
  ) : (
    <div
      className="mt-[1rem] gap-[2px] w-[50%] p-[0.5rem] cursor-pointer flex justify-evenly items-center bg-[#007BFF]/80 rounded-full text-md border-none text-white"
      onClick={handleClick}
    >
      <FaPlus color="white" size={13} />
      Add a card
    </div>
  );
}

export default AddCard;
