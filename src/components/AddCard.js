import React, { useState } from "react";

function AddCard({ onAdd }) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onAdd(input);
    setInput("");
    setIsOpen(false);
  };

  return isOpen ? (
    <form onSubmit={handleSubmit}>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="functions">
        <button type="submit" className="add">
          Add
        </button>
        <button
          type="button"
          className="cancel"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button className="openButton" onClick={() => setIsOpen(true)}>
      +
    </button>
  );
}

export default AddCard;
