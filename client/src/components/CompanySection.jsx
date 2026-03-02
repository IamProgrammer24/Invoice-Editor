import DraggableResizable from "./DraggableResizable";
import { useState, useEffect, useRef } from "react";

const CompanySection = ({ data, layout, refs, editMode }) => {
  const titleContainerRef = useRef(null);
  const firstRender = useRef(true);

  const [fontSize, setFontSize] = useState(
    layout?.title?.height ? (layout.title.height / 60) * 40 : 40,
  );

  // Track if the title itself is active (draggable)
  const [isTitleActive, setIsTitleActive] = useState(false);

  // Update font size if layout changes
  useEffect(() => {
    if (layout?.title?.height) {
      setFontSize((layout.title.height / 60) * 40);
    }
  }, [layout]);

  // ResizeObserver for title
  useEffect(() => {
    if (!editMode || !isTitleActive || !titleContainerRef.current) return;

    const container = titleContainerRef.current;

    // Reset firstRender whenever title becomes active
    firstRender.current = true;

    const resizeObserver = new ResizeObserver(() => {
      if (!titleContainerRef.current) return;
      const { width, height } =
        titleContainerRef.current.getBoundingClientRect();

      // font size relative to container height
      const newFontSize = Math.max(Math.min(height * 0.7, 80), 12); // 0.7 = 70% of height
      setFontSize(newFontSize);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [editMode, isTitleActive]);

  const renderTitle = () => {
    if (isTitleActive && editMode) {
      return (
        // <DraggableResizable
        //   layout={{
        //     x: layout?.title?.x || 0,
        //     y: layout?.title?.y || 0,
        //     width: layout?.title?.width || 200,
        //     height: layout?.title?.height || 60,
        //   }}
        // >
        //   <div
        //     ref={titleContainerRef}
        //     style={{
        //       width: "100%",
        //       height: "100%",
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <h1
        //       style={{
        //         fontSize: `${fontSize}px`,
        //         lineHeight: 1,
        //         fontWeight: "bold",
        //         width: "100%",
        //         textAlign: "center",
        //       }}
        //     >
        //       INVOICE
        //     </h1>
        //   </div>
        // </DraggableResizable>
        <DraggableResizable
          layout={{
            x: layout?.title?.x || 0,
            y: layout?.title?.y || 0,
            width: layout?.title?.width || 200,
            height: layout?.title?.height || 60,
          }}
        >
          <div
            ref={titleContainerRef}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <h1
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1,
                fontWeight: "bold",
                width: "100%",
                height: "100%",
                margin: 0, // remove default h1 margin
                padding: 0, // remove any padding
                // textAlign: "center",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              INVOICE
            </h1>
          </div>
        </DraggableResizable>
      );
    } else {
      return (
        <div
          ref={titleContainerRef}
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent drag activation
            if (editMode) setIsTitleActive(true);
          }}
        >
          <h1
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1.1,
              fontWeight: "bold",
              cursor: editMode ? "pointer" : "default",
            }}
          >
            INVOICE
          </h1>
        </div>
      );
    }
  };

  return (
    <div
      className="relative mb-12"
      style={{ width: "100%", minHeight: 150 }}
      onClick={() => {
        if (editMode && !isTitleActive) setIsTitleActive(false); // reset when clicking outside
      }}
    >
      {renderTitle()}

      <div className="absolute right-0 top-0 text-right">
        <h2 className="font-semibold text-lg">{data.company.name}</h2>
        <p>{data.company.address}</p>
        <p>{data.company.email}</p>
        <p>{data.company.phone}</p>
      </div>
    </div>
  );
};

export default CompanySection;
