import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";

const DraggableResizable = ({ children, layout, onDragResize }) => {
  const [isSelected, setIsSelected] = useState(false);
  const wrapperRef = useRef(null); // actual DOM wrapper
  console.log("draggable", layout);
  if (!layout) return null;

  // Deselect when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      onDragStop={(e, d) => {
        e.stopPropagation();
        onDragResize?.({ type: "drag", x: d.x, y: d.y });
      }}
      onDragStart={(e) => e.stopPropagation()}
      onResizeStart={(e) => e.stopPropagation()}
      onResizeStop={(e, dir, ref, delta, pos) => {
        e.stopPropagation();

        onDragResize?.({
          type: "resize",
          x: pos.x,
          y: pos.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsSelected(true);
      }}
      className="cursor-move"
    >
      <div
        ref={wrapperRef}
        className={`relative w-full h-full ${
          isSelected ? "border-2 border-blue-500" : ""
        }`}
      >
        {children}
      </div>
    </Rnd>
  );
};

export default DraggableResizable;
