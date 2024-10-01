import React from "react";
import Card from "./Card";

export default function List({ list }) {
  return (
    <div className="list">
      <div className="list-title">{list.title}</div>
      <Card list={list} />
    </div>
  );
}
