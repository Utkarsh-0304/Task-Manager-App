import React, { useState, useRef } from "react";

async function addListToBoard(listTitle) {
  const response = await fetch(`http://localhost:3001/lists`, {
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

export default function AddList({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    try {
      const newList = await addListToBoard(input);
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
    <form onSubmit={handleSubmit} className="addListForm">
      <textarea
        value={input}
        ref={inputRef}
        onKeyDown={onEnterPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a title"
        onInput={handleInput}
      />
      <div className="functions">
        <button type="submit" className="add" disabled={!input.trim()}>
          Add
        </button>
        <button
          type="button"
          className="cancel"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </div>
    </form>
  ) : (
    <button className="addListButton" onClick={handleClick}>
      +
    </button>
  );
}
