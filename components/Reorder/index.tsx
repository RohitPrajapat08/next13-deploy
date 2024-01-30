import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Reorder(props: any) {
  console.log(props, "Reorder Component");

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container articles={props?.articles} />
      </DndProvider>
    </div>
  );
}
