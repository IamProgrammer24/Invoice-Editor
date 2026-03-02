import DraggableResizable from "./DraggableResizable";

const CompanySection = ({ data, layout, refs, editMode }) => {
  return (
    <div className="relative mb-12" style={{ width: "100%", minHeight: 150 }}>
      {/* ================= LEFT ================= */}
      {editMode ? (
        <DraggableResizable layout={layout?.title}>
          <h1 className="text-5xl font-bold cursor-move">INVOICE</h1>
        </DraggableResizable>
      ) : (
        <div ref={refs?.titleRef}>
          <h1 className="text-5xl font-bold">INVOICE</h1>
        </div>
      )}

      {/* ================= RIGHT ================= */}
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
