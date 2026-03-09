import { useEffect, useRef, useState } from "react";
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

  const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );

  const taxAmount = (subtotal * invoiceData.tax) / 100;
  const grandTotal = subtotal + taxAmount;
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

  const tableRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (tableRef.current) {
      const height = tableRef.current.offsetHeight;
      setTableHeight(height);
    }
  }, [invoiceData]);

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
  const billToSize = getDynamicFontSize(tempLayout.billTo);
  const billNameSize = getDynamicFontSize(tempLayout.billName);
  const billDateSize = getDynamicFontSize(tempLayout.billDate);
  const billDate1Size = getDynamicFontSize(tempLayout.billDate1);
  const invoiceNumberSize = getDynamicFontSize(tempLayout.invoiceNumber);
  const invoiceNumber1Szide = getDynamicFontSize(tempLayout.invoiceNumber1);
  const amountDueSize = getDynamicFontSize(tempLayout.amountDue);
  const amountDue1Size = getDynamicFontSize(tempLayout.amountDue1);
  const descriptionSize = getDynamicFontSize(tempLayout.description);
  const rateSize = getDynamicFontSize(tempLayout.rateSize);
  const qtySize = getDynamicFontSize(tempLayout.qty);
  const amountSize = getDynamicFontSize(tempLayout.amount);
  const subtotalSize = getDynamicFontSize(tempLayout.subtotal);
  const subtotalAmountSize = getDynamicFontSize(tempLayout.subtotalAmount);
  const taxSize = getDynamicFontSize(tempLayout.tax);
  const taxAmountSize = getDynamicFontSize(tempLayout.taxAmount);
  const totalSize = getDynamicFontSize(tempLayout.total);
  const totalAmountSize = getDynamicFontSize(tempLayout.totalAmount);

  if (!editMode) {
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
          </div>

          <div ref={customerRef}>
            <CustomerSection data={invoiceData} />
          </div>

          <div ref={dividerRef}>
            <div className="border-b-2 border-blue-600 mb-8"></div>
          </div>

          <div ref={totalRef}>
            <TotalSection data={invoiceData} />
          </div>

          <div ref={notesRef}>
            <Notes />
          </div> */}

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
            {invoiceData.company.name}
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
            {invoiceData.company.address}
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
            {invoiceData.company.email}
          </div>
          <div
            style={{
              position: "absolute",
              left: "46px",
              top: "246px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Billed To
          </div>
          <div
            style={{
              position: "absolute",
              left: "48px",
              top: "270px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
            }}
          >
            <span>{invoiceData.customer.name}</span> <br />
            <span>{invoiceData.customer.address}</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "228px",
              top: "246px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Date Issued
          </div>
          <div
            style={{
              position: "absolute",
              left: "228px",
              top: "270px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
            }}
          >
            {invoiceData.invoiceInfo.date}
          </div>
          <div
            style={{
              position: "absolute",
              left: "410px",
              top: "246px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Invoice Number
          </div>
          <div
            style={{
              position: "absolute",
              left: "408px",
              top: "270px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
            }}
          >
            {invoiceData.invoiceInfo.invoiceNumber}
          </div>
          <div
            style={{
              position: "absolute",
              left: "590px",
              top: "246px",
              width: "200px",
              height: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Amount Due
          </div>
          <div
            style={{
              position: "absolute",
              left: "590px",
              top: "269px",
              width: "200px",
              height: "50px",
              fontSize: "19px",
              fontWeight: "bold",
            }}
          >
            ₹
          </div>
          <div
            style={{
              position: "absolute",
              left: "50px",
              top: "358px",
              width: "694px",
            }}
            className="border-b-2 border-blue-600"
          ></div>
          {/* <div
            style={{
              position: "absolute",
              left: "48px",
              top: "392px",
              width: "200px",
              height: "50px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            DESCRIPTION
          </div>
          <div
            style={{
              position: "absolute",
              left: "463px",
              top: "397px",
              width: "200px",
              height: "50px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            RATE
          </div>
          <div
            style={{
              position: "absolute",
              left: "550px",
              top: "397px",
              width: "200px",
              height: "50px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            QTY
          </div>
          <div
            style={{
              position: "absolute",
              left: "683px",
              top: "397px",
              width: "200px",
              height: "50px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            AMOUNT
          </div> */}
          <div
            ref={tableRef}
            style={{
              position: "absolute",
              left: "48px",
              top: "395px",
              width: "700px",
            }}
          >
            <ItemsTable data={invoiceData} />
          </div>
          <div
            style={{
              position: "absolute",
              left: "48px",
              top: 395 + tableHeight,
              width: "700px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "418px",
                top: "0px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              Subtotal
            </div>
            <div
              style={{
                position: "absolute",
                left: "647px",
                top: "0px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              {subtotal}
            </div>
            <div
              style={{
                position: "absolute",
                left: "418px",
                top: "50px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              Tax 18%:
            </div>
            <div
              style={{
                position: "absolute",
                left: "647px",
                top: "50px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              {taxAmount}
            </div>
            <div
              style={{
                position: "absolute",
                left: "418px",
                top: "90px",
                width: "300px",
              }}
              className="border-b-2"
            ></div>
            <div
              style={{
                position: "absolute",
                left: "418px",
                top: "100px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              Total:
            </div>
            <div
              style={{
                position: "absolute",
                left: "647px",
                top: "100px",
                width: "200px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              {grandTotal}
            </div>
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "150px",
                width: "300px",
                height: "50px",
              }}
            >
              <Notes />
            </div>
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
        {/* 
         <DraggableResizable layout={layout.customer}>
          <CustomerSection data={invoiceData} />
        </DraggableResizable> */}
        {/* 
        <DraggableResizable layout={layout.divider}>
          <div className="border-b-2 border-blue-600 w-full"></div>
        </DraggableResizable> */}

        {/* <DraggableResizable layout={layout.total}>
          <TotalSection data={invoiceData} />
        </DraggableResizable> */}

        {/* <DraggableResizable layout={layout.notes}>
          <Notes />
        </DraggableResizable>  */}
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
            {invoiceData.company.name}
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
            {invoiceData.company.address}
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
            {invoiceData.company.email}
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.billTo}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              billTo: {
                ...prev.billTo,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              fontWeight: "bold",

              fontSize: billToSize,
              color: "#2563EB",
            }}
          >
            Billed To
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.billName}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              billName: {
                ...prev.billName,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",

              fontSize: billNameSize,
            }}
          >
            <span>{invoiceData.customer.name}</span> <br />
            <span>{invoiceData.customer.address}</span>
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.billDate}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              billDate: {
                ...prev.billDate,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              fontSize: billDateSize,
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Date Issued
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.billDate1}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              billDate1: {
                ...prev.billDate1,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",

              fontSize: billDate1Size,
            }}
          >
            {invoiceData.invoiceInfo.date}
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.invoiceNumber}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              invoiceNumber: {
                ...prev.invoiceNumber,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",

              fontSize: invoiceNumberSize,
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Invoice Number
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.invoiceNumber1}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              invoiceNumber1: {
                ...prev.invoiceNumber1,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",

              fontSize: invoiceNumber1Szide,
            }}
          >
            {invoiceData.invoiceInfo.invoiceNumber}
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.amountDue}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              amountDue: {
                ...prev.amountDue,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              fontWeight: "bold",
              color: "#2563EB",
              fontSize: amountDueSize,
            }}
          >
            Amount Due
          </div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.amountDue1}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              amountDue1: {
                ...prev.amountDue1,
                ...data,
              },
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              fontWeight: "bold",
              fontSize: amountDue1Size,
            }}
          >
            ₹
          </div>
        </DraggableResizable>
        <DraggableResizable layout={tempLayout.line}>
          {" "}
          <div className="border-b-2 border-blue-600"></div>
        </DraggableResizable>
        <DraggableResizable
          layout={tempLayout.table}
          onDragResize={(data) => {
            setTempLayout((prev) => ({
              ...prev,
              table: {
                ...prev.table,
                ...data,
              },
            }));
          }}
        >
          <ItemsTable
            style={{
              position: "absolute",
            }}
            data={invoiceData}
          />
        </DraggableResizable>
        <div
          className="relative"
          style={{
            position: "absolute",
            left: "48px",
            top: 395 + tableHeight,
            width: "100%",
            height: "40%",
          }}
        >
          <DraggableResizable
            layout={tempLayout.subtotal}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                subtotal: {
                  ...prev.subtotal,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",
                fontSize: subtotalSize,
              }}
            >
              Subtotal
            </div>
          </DraggableResizable>
          <DraggableResizable
            layout={tempLayout.subtotalAmount}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                subtotalAmount: {
                  ...prev.subtotalAmount,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",
                fontSize: subtotalAmountSize,
              }}
            >
              {subtotal}
            </div>
          </DraggableResizable>
          <DraggableResizable
            layout={tempLayout.tax}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                tax: {
                  ...prev.tax,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",

                fontSize: taxSize,
              }}
            >
              Tax 18%:
            </div>
          </DraggableResizable>
          <DraggableResizable
            layout={tempLayout.taxAmount}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                taxAmount: {
                  ...prev.taxAmount,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",

                fontSize: taxAmountSize,
              }}
            >
              {taxAmount}
            </div>
          </DraggableResizable>
          <DraggableResizable layout={tempLayout.border}>
            <div
              style={{
                position: "absolute",
                width: "300px",
                height: "50px",
              }}
              className="border-t-2"
            ></div>
          </DraggableResizable>
          <DraggableResizable
            layout={tempLayout.total}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                total: {
                  ...prev.total,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",
                fontSize: totalSize,
              }}
            >
              Total:
            </div>
          </DraggableResizable>
          <DraggableResizable
            layout={tempLayout.totalAmount}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                totalAmount: {
                  ...prev.totalAmount,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",
                fontSize: totalAmountSize,
              }}
            >
              {grandTotal}
            </div>
          </DraggableResizable>
          <DraggableResizable
            layout={tempLayout.notes}
            onDragResize={(data) => {
              setTempLayout((prev) => ({
                ...prev,
                notes: {
                  ...prev.notes,
                  ...data,
                },
              }));
            }}
          >
            <div
              style={{
                position: "absolute",
              }}
            >
              <Notes />
            </div>
          </DraggableResizable>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCanvas;
