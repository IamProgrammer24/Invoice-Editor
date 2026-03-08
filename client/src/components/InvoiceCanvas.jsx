import { useEffect, useState } from "react";
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
    testref,
    itemsRef,
    totalRef,
    noreref,
    notesRef,
    dividerRef,
  } = useInvoiceLayout();

  const [tempLayout, setTempLayout] = useState(layout);

  useEffect(() => {
    if (editMode) {
      setTempLayout(layout); // reset temp layout when editing starts
    }
  }, [editMode, layout]);

  //  =========================== Function to downlod PDF =======================

  const getDynamicFontSize = (layoutItem) => {
    if (!layoutItem) return 16;

    const baseHeight = 50; // height where font looks correct

    return layoutItem.height
      ? (layoutItem.height / baseHeight) * layoutItem.defaultFontSize
      : layoutItem.defaultFontSize;
  };

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
  const titleFontSize = getDynamicFontSize(tempLayout.test);
  const companyNameSize = getDynamicFontSize(tempLayout.companyName);
  const companyAddSize = getDynamicFontSize(tempLayout.companyAdd);
  const companyMailSize = getDynamicFontSize(tempLayout.companyMail);

  if (!editMode) {
    console.log("Current layout:", layout);
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          {/* Edit Layout Button */}
          <button
            onClick={() => {
              // captureLayout();
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
          className="relative bg-white shadow-xl p-12 text-gray-800"
          style={{ width: "794px", minHeight: "1123px" }}
        >
          {/* <div ref={companyRef}>
            <CompanySection
              data={invoiceData}
              refs={{ titleRef }}
              editMode={false}
            />
          </div> */}

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

          <div className="absolute">
            <p className="text-blue-600 font-semibold">Notes</p>
            <p>Thank you for your business!</p>
          </div>
          <div
            style={{
              position: "absolute",
              left: "49px",
              top: "40px",
              width: "200px",
              height: "50px",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            INVOICE
          </div>
          <div
            style={{
              position: "absolute",
              right: "29px",
              top: "49px",
              width: "200px",
              height: "50px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Tech Solutions Pvt Ltd
          </div>
          <div
            style={{
              position: "absolute",
              left: "618px",
              top: "76px",
              width: "200px",
              height: "30px",
              fontSize: "16px",
            }}
          >
            Gwalior, MP, India
          </div>
          <div
            style={{
              position: "absolute",
              left: "551px",
              top: "101px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
            }}
          >
            contact@techsolutions.com
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
            // captureLayout();
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
        {/* <DraggableResizable layout={layout.company?.container}>
          <CompanySection
            data={invoiceData}
            layout={layout.company}
            refs={{ titleRef }}
            editMode={true}
          />
        </DraggableResizable> */}

        {/* <DraggableResizable layout={layout.customer}>
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
        </DraggableResizable> */}
        <DraggableResizable
          layout={tempLayout.test}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              test: {
                ...prev.test,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: titleFontSize,
            }}
          >
            INVOICE
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.companyName}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              companyName: {
                ...prev.companyName,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              fontSize: companyNameSize,
              fontWeight: "600",
            }}
          >
            Tech Solutions Pvt Ltd
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.companyAdd}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              companyAdd: {
                ...prev.companyAdd,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              fontSize: companyAddSize,
            }}
          >
            Gwalior, MP, India
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.companyMail}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              companyMail: {
                ...prev.companyMail,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",

              fontSize: companyMailSize,
            }}
          >
            contact@techsolutions.com
          </div>
        </DraggableResizable>
      </div>
    </div>
  );
};

export default InvoiceCanvas;
