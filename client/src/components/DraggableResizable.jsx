import { Rnd } from "react-rnd";

const DraggableResizable = ({ children, layout }) => {
  if (!layout) return null;

  return (
    <Rnd
      bounds="parent"
      default={{
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
      }}
      enableResizing
      className="hover:border hover:border-blue-500"
      onDragStop={(e, d) => {
        console.log("Drag:", {
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        console.log("Resize:", {
          x: position.x,
          y: position.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
    >
      {children}
    </Rnd>
  );
};
export default DraggableResizable;
