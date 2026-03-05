import { useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

import CompanySection from "./CompanySection";
import CustomerSection from "./CustomerSection";
import ItemsTable from "./ItemsTable";
import Notes from "./Notes";
import TotalSection from "./TotalSection";

import DraggableResizable from "./DraggableResizable";
import useInvoiceLayout from "../hooks/useInvoiceLayout";

const InvoiceCanvas = ({ invoiceData }) => {
  const [editMode, setEditMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    layout,
    captureLayout,
    invoiceRef,
    companyRef,
    customerRef,
    titleRef,
    itemsRef,
    totalRef,
    notesRef,
    dividerRef,
  } = useInvoiceLayout();

  //  =========================== Function to downlod PDF =======================

  const downloadPDF = async () => {
    const prevMode = editMode;
    setIsDownloading(true);

    // hide edit borders temporarily
    // setEditMode(false);

    setTimeout(async () => {
      try {
        const dataUrl = await htmlToImage.toPng(invoiceRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });

        const pdf = new jsPDF("p", "mm", "a4");

        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const imgWidth = 210;
          const imgHeight = (img.height * imgWidth) / img.width;

          pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("invoice.pdf");

          setEditMode(prevMode);
        };
      } catch (error) {
        console.error("PDF generation failed", error);
        setEditMode(prevMode);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  /* ====================== PREVIEW MODE ====================== */
  if (!editMode) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          {/* Edit Layout Button */}
          <button
            onClick={() => {
              captureLayout();
              setEditMode(true);
            }}
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Edit Layout
          </button>

          {/* Download PDF Button */}
          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition flex items-center gap-2
      ${
        isDownloading
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
          >
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>

        <div
          ref={invoiceRef}
          id="invoice"
          className="bg-white shadow-xl p-12 text-gray-800"
          style={{ width: "794px", minHeight: "1123px" }}
        >
          <div ref={companyRef}>
            <CompanySection
              data={invoiceData}
              refs={{ titleRef }}
              editMode={false}
            />
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

  /* ====================== EDIT MODE ====================== */
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 mb-4">
        {/* Edit Layout Button */}
        <button
          onClick={() => {
            captureLayout();
            setEditMode(false);
          }}
          className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Preview Mode
        </button>

        {/* Download PDF Button */}
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition flex items-center gap-2
      ${
        isDownloading
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
        >
          {isDownloading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>
      <div
        ref={invoiceRef}
        id="invoice"
        className="relative bg-white shadow-xl p-12"
        style={{ width: "794px", minHeight: "1123px" }}
      >
        <DraggableResizable layout={layout.company?.container}>
          <CompanySection
            data={invoiceData}
            layout={layout.company}
            refs={{ titleRef }}
            editMode={true}
          />
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
