import React, { useRef, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDrag } from "react-dnd";

const Card = ({ card, moveCard, openModal }) => {
  const cardRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, type: "CARD" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (cardRef.current) {
      // You can pass cardRef.current to any library that expects an element reference
      console.log("Card ref is rendered", cardRef.current);
    }
  }, []);

  const handleDrag = (e) => {
    const newX = e.clientX - 100; // Adjust the offset
    const newY = e.clientY - 50;
    moveCard(card.id, newX, newY);
  };

  return (
    <Draggable draggableId={card.id} index={card.index}>
      {(provided) => (
        <div
          className="resize w-64 h-64 overflow-auto bg-gray-400  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} // Card's elementRef
          //   onMouseUp={handleDrag}
          style={{
            position: "absolute",
            top: card.y,
            left: card.x,
            opacity: isDragging ? 0.5 : 1,
            cursor: "move",
            padding: "10px",
          }}
        >
          <p>
            {card.index}. {card.text.slice(0, 20)} ...{" "}
            <button
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  hover:bg-gray-100 hover:text-[#0f172a]  font-semibold   border border-gray-400 rounded-full w-3/5 px-2 py-1 shadow"
              onClick={() => openModal(card)}
            >
              Show More
            </button>
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
