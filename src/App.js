import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "./components/Canvas";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropContext onDragEnd={() => {}}>
        <Canvas />
      </DragDropContext>
    </DndProvider>
  );
}

export default App;
