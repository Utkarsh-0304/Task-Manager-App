import React, { useState, useRef } from "react";

function AddCard({ onAdd }) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onAdd(input);
    setInput("");
    setIsOpen(false);
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
    <form onSubmit={handleSubmit}>
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
          X
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
