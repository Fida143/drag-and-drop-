import React, { useState, useRef, useEffect } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import Card from "./Card";
import Modal from "react-modal";
import { ResizableBox } from "react-resizable";
import { Droppable } from "react-beautiful-dnd";

Modal.setAppElement("#root");

const Canvas = () => {
  const [cards, setCards] = useState([
    {
      index: 1,
      id: Date.now(),
      x: Math.random() * 300,
      y: Math.random() * 300,
      text: "This is a sample text with a show more option.",
    },
  ]);
  const [selectedCard, setSelectedCard] = useState(null);
  const canvasRef = useRef(null); // Ref for canvas

  const [inputText, setInputText] = useState("");

  const addCard = () => {
    const newCard = {
      index: cards.length + 1,
      id: Date.now(),
      x: Math.random() * 300,
      y: Math.random() * 300,
      text: inputText,
    };
    setCards([...cards, newCard]);
    {
      console.log(cards);
    }
    setInputText("");
  };

  const moveCard = (id, x, y) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, x, y } : card)));
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    if (canvasRef.current) {
      // Ensures that the canvas element is available for any renderer logic that might need it
      console.log("Canvas is rendered", canvasRef.current);
    }
  }, []);

  return (
    <Droppable droppableId="cards">
      {(provided) => (
        <div
          style={{ height: "80vh", width: "100vw", overflow: "hidden" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <input
            type="text"
            value={inputText}
            className="px-2 py-2 rounded text-black ml-3 outline-none border-0 "
            placeholder="Enter Here ..."
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <button
            className="bg-transparent hover:bg-gray-100 text-white font-semibold hover:text-[#0f172a] m-4 py-2 px-4 border border-white hover:border-transparent rounded"
            onClick={addCard}
          >
            Add Card
          </button>

          {cards.map((card, index) => (
            <Card card={card} moveCard={moveCard} openModal={openModal} />
          ))}

          {selectedCard && (
            <Modal
              isOpen={true}
              onRequestClose={closeModal}
              contentLabel="Card Details"
            >
              <h2 className="text-[#0f172a] font-bold text-xl">
                {selectedCard.index}. Card Details
              </h2>
              <p className="text-black mt-1">{selectedCard.text}</p>
              <button
                className="text-red-500 font-bold text-xl  absolute right-4 top-4 focus:outline-none rounded-full   text-center me-2 mb-2 "
                onClick={closeModal}
              >
                X
              </button>
            </Modal>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default Canvas;
