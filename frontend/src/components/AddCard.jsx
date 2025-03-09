import React, { useState, useRef } from "react";
import { IoIosClose } from "react-icons/io";

async function addCardToList(listId, cardTitle) {
  const response = await fetch(`http://localhost:3001/lists/${listId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: cardTitle }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Card added:", data.cards[data.cards.length - 1]);
    return data.cards[data.cards.length - 1];
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
    <form onSubmit={handleSubmit} className="addCardForm">
      <textarea
        value={input}
        ref={inputRef}
        onKeyDown={onEnterPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a title or paste a link"
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
          <IoIosClose />
        </button>
      </div>
    </form>
  ) : (
    <button className="openButton" onClick={handleClick}>
      +
    </button>
  );
}

export default AddCard;
