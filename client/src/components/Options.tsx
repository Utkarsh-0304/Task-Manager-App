import React from "react";

interface OptionsProps {
  board_id: string;
  list_id: string;
  deleteList: (boardId: string, listId: string) => void;
}

const Options = React.forwardRef<HTMLDivElement, OptionsProps>(function Options(props, ref) {
  const { board_id, list_id, deleteList } = props;
  return (
    <div
      ref={ref}
      className="absolute top-[40px] -right-[60px] z-[10] rounded-[4px] p-[0.5rem] text-white bg-black shadow-md"
    >
      <ul>
        <li>
          <button
            onClick={() => deleteList(board_id, list_id)}
            className="w-full rounded hover:bg-red-500 transition-all"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
});

export default Options;
