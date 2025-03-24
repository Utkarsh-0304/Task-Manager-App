export default function Options({ id, deleteList }) {
  return (
    <div className=" absolute top-[40px] -right-[60px] z-[10] rounded-[4px] p-[0.5rem] bg-black shadow-md">
      <ul>
        <li>
          <button
            onClick={() => deleteList(id)}
            className="w-full text-white rounded  hover:bg-red-500 transition-all"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}
