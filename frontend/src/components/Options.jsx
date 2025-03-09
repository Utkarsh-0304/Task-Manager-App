export default function Options({ id, deleteList }) {
  return (
    <div className="opts">
      <ul>
        <li>
          <button onClick={() => deleteList(id)}>Delete</button>
        </li>
      </ul>
    </div>
  );
}
