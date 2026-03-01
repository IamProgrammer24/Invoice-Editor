import { useState } from "react";

import CompanySection from "./CompanySection";
import CustomerSection from "./CustomerSection";
import ItemsTable from "./ItemsTable";
import Notes from "./Notes";
import TotalSection from "./TotalSection";

import DraggableResizable from "./DraggableResizable";
import useInvoiceLayout from "../hooks/useInvoiceLayout";

/* -----------------------------
        Invoice Canvas
--------------------------------*/
const InvoiceCanvas = ({ invoiceData }) => {
  const [editMode, setEditMode] = useState(false);

  /* ✅ Layout Hook */
  const {
    layout,
    captureLayout,
    invoiceRef,
    companyRef,
    customerRef,
    itemsRef,
    totalRef,
    notesRef,
    dividerRef,
  } = useInvoiceLayout();

  /* =============================
        PREVIEW MODE
  ==============================*/
  if (!editMode) {
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            captureLayout();
            setEditMode(true);
          }}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit Layout
        </button>

        <div
          ref={invoiceRef}
          id="invoice"
          className="bg-white shadow-xl p-12 text-gray-800"
          style={{
            width: "800px",
            minHeight: "1100px",
          }}
        >
          <div ref={companyRef}>
            <CompanySection data={invoiceData} />
          </div>

          <div ref={customerRef}>
            <CustomerSection data={invoiceData} />
          </div>

          <div ref={dividerRef}>
            <div className="border-b-2 border-blue-600 mb-8"></div>
          </div>

          <div ref={itemsRef}>
            <ItemsTable data={invoiceData} />
          </div>

          <div ref={totalRef}>
            <TotalSection data={invoiceData} />
          </div>

          <div ref={notesRef}>
            <Notes />
          </div>
        </div>
      </div>
    );
  }

  /* =============================
        EDIT MODE
  ==============================*/
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setEditMode(false)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Preview Mode
      </button>

      <div
        ref={invoiceRef}
        id="invoice"
        className="relative bg-white shadow-xl p-12"
        style={{
          width: "800px",
          minHeight: "1100px",
        }}
      >
        <DraggableResizable layout={layout.company}>
          <CompanySection data={invoiceData} />
        </DraggableResizable>

        <DraggableResizable layout={layout.customer}>
          <CustomerSection data={invoiceData} />
        </DraggableResizable>

        <DraggableResizable layout={layout.divider}>
          <div className="border-b-2 border-blue-600 w-full"></div>
        </DraggableResizable>

        <DraggableResizable layout={layout.items}>
          <ItemsTable data={invoiceData} />
        </DraggableResizable>

        <DraggableResizable layout={layout.total}>
          <TotalSection data={invoiceData} />
        </DraggableResizable>

        <DraggableResizable layout={layout.notes}>
          <Notes />
        </DraggableResizable>
      </div>
    </div>
  );
};

export default InvoiceCanvas;
