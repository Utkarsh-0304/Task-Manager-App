import DeleteButton from "./DeleteButton";
import { useDraggable } from "@dnd-kit/core";
import { RxDragHandleDots2 } from "react-icons/rx";

interface CardType {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

interface CardProps {
  card: CardType;
  onDelete: (cardId: string) => void;
  listId: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrCard: React.Dispatch<React.SetStateAction<CardType | null>>
}

function Card({ card, onDelete, listId, setIsModalOpen, setCurrCard }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card._id,
    data: {
      listId,
    },
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mt-[1rem] p-[0.5rem] rounded-[5px] bg-[#EFF2F5] flex items-center justify-between gap-[0.5rem] w-full hover:bg-[#E6F2FF] touch-none group"
    >
      <div {...listeners} {...attributes} className="">
        <RxDragHandleDots2 />
      </div>
      <p
        className="w-[80%] cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
          setCurrCard(card);
        }}
      >
        {card.title}
      </p>

      <DeleteButton card={card} onDelete={onDelete} />
    </div>
  );
}

export default Card;
