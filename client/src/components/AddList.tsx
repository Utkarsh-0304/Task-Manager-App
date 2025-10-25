import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

interface List {
  _id: string;
  title: string;
  cards: Card[];
  __v: number;
}

interface Card {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

async function addListToBoard(id: string, listTitle: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/lists/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: listTitle }),
  });

  const data = await response.json();

  if (response.ok) {
    toast.success("List created succesfully");
    return data;
  } else {
    console.error("Error:", data.message);
  }
}

export default function AddList({
  boardId,
  onAdd,
}: {
  boardId: string;
  onAdd: (list: List) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const submit = async () => {
    if (input.trim() === "") return;
    try {
      const newList = await addListToBoard(boardId, input);
      setInput("");
      if (newList) onAdd(newList);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to add a list");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit();
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      submit();
    }
  };

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInput = () => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  };

  return isOpen ? (
    <form
      onSubmit={handleSubmit}
      className="rounded-[3px] p-[10px] h-fit border-2 border-[#EFF2F5] bg-[#EFF2F5]"
    >
      <textarea
        className="w-full text-black border-none rounded-[3px] p-[5px]  text-[1rem] overflow-x-hidden resize-none whitespace-pre-wrap font-[Verdana] focus:outline-none"
        value={input}
        ref={inputRef}
        onKeyDown={onEnterPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a title"
        onInput={handleInput}
      />
      <div className="text-white flex justify-start items-center gap-[0.5rem] [&>button]:mt-[0.5rem] [&>button]: [&>button]:border-none [&>button]:rounded-[3px] [&>button]:px-[6px] [&>button]:py-[12px] [&>button]:cursor-pointer">
        <button
          type="submit"
          className="w-[60px] h-[40px] bg-[#427cc2] flex items-center justify-center hover:bg-[#4382cf] disabled:opacity-[0.5]"
          disabled={!input.trim()}
        >
          Add
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-[#3f3f3f] w-[40px] h-[40px] text-xl hover:bg-[#6f717c]"
          onClick={() => setIsOpen(false)}
        >
          <IoIosClose />
        </button>
      </div>
    </form>
  ) : (
    <div
      className="bg-blue-900/50 w-[10rem] h-[50px] rounded-[5px] text-lg border-none cursor-pointer flex justify-evenly items-center text-white"
      onClick={handleClick}
    >
      <FaPlus color="white" size={15} />
      Add a list
    </div>
  );
}
