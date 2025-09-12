import { useEffect, useState } from "react";
import List from "./List";
import AddList from "./AddList";
import { SkeletonList } from "./SkeletonList";
import { MdChevronLeft } from "react-icons/md";
import { DndContext } from "@dnd-kit/core";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

function Board({ board, setSelectedBoard }) {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCardListId, setOpenCardListId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [currCard, setCurrCard] = useState(null);
  const [adding, setAdding] = useState(false);

  async function fetchBoardData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${board._id}`
      );
      const listsData = await response.json();

      const listsWithCards = await Promise.all(
        listsData.map(async (list) => {
          const cardsResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/cards/${list._id}`
          );
          const cardsData = await cardsResponse.json();
          return { ...list, cards: cardsData };
        })
      );

      setLists(listsWithCards);
    } catch (err) {
      console.error("Couldn't fetch board data: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBoardData();
  }, [board._id]);

  function addList(newList) {
    if (!newList) return;
    setLists([...lists, { ...newList, cards: [] }]);
  }

  async function deleteList(boardId, listId) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lists/${boardId}/${listId}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      setLists(lists.filter((list) => list._id !== listId));
      toast.success("List Deleted successfully")
    } else {
      console.error("Failed to delete list");
    }
  }

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || !active.data.current) return;

    const { listId: sourceListId } = active.data.current;
    const destinationListId = over.id;
    const cardId = active.id;

    if (sourceListId === destinationListId) return;

    setLists((prevLists) => {
      let cardToMove;
      const sourceList = prevLists.find((list) => list._id === sourceListId);
      if (sourceList) {
        cardToMove = sourceList.cards.find((card) => card._id === cardId);
      }

      if (!cardToMove) return prevLists;

      const newLists = prevLists.map((list) => {
        if (list._id === sourceListId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card._id !== cardId),
          };
        }
        if (list._id === destinationListId) {
          return {
            ...list,
            cards: [...list.cards, cardToMove],
          };
        }
        return list;
      });

      return newLists;
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/drag_and_drop`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ destinationListId, sourceListId, cardId }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddDescription = async (cardId) => {
    setAdding(true);
    try {
      if (cardId == null) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/card/${cardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: description }),
        }
      );

      if (response.ok) {
        setAdding(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col shrink-0 h-[90vh]">
      <div
        className="flex flex-row items-center w-60 text-[#ccc] cursor-pointer underline underline-offset-2"
        onClick={() => setSelectedBoard(null)}
      >
        <MdChevronLeft color="gray" />
        Back to Boards
      </div>
      <div className="w-full relative h-[90vh] flex flex-row">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="m-[1rem] flex flex-row gap-[1.5rem]">
            {isLoading ? (
              <SkeletonList />
            ) : lists.length === 0 ? (
              <div className="italic text-[#bbb]">
                Click here to add some lists
              </div>
            ) : (
              lists.map((list) => (
                <List
                  key={list._id}
                  boardId={board._id}
                  list={list}
                  cards={list.cards}
                  deleteList={deleteList}
                  setLists={setLists}
                  openCardListId={openCardListId}
                  setOpenCardListId={setOpenCardListId}
                  setIsModalOpen={setIsModalOpen}
                  setCurrCard={setCurrCard}
                />
              ))
            )}
            <AddList boardId={board._id} onAdd={addList} />
          </div>
        </DndContext>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-[2rem] h-full">
          <div className="text-2xl flex flex-row justify-between">
            {currCard?.title}{" "}
            <IoMdClose
              className="cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
                setCurrCard(null);
                setDescription("");
              }}
            />
          </div>

          <div className="relative flex flex-col gap-4 items-start">
            <h2>Description</h2>
            <textarea
              rows={3}
              className="border p-2 w-full text-md resize-none focus:outline-none"
              placeholder={currCard?.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {description && (
              <div>
                <button
                  className="p-2 pl-2 pr-2 rounded text-white bg-blue-500 cursor-pointer"
                  onClick={() => handleAddDescription(currCard?._id)}
                >
                  {adding ? "Adding" : "Add"}
                </button>
                <button
                  className="p-2 rounded cursor-pointer"
                  onClick={() => setDescription("")}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Board;
