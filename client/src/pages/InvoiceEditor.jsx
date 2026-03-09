import { useState } from "react";
import { mockInvoice } from "../data/invoiceData";
import InvoiceCanvas from "../components/InvoiceCanvas";

const InvoiceEditor = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  const generateInvoice = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/invoices");
      const data = await response.json();

      // if backend sends { success: true, data: mockInvoice }
      setInvoiceData(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <button
        onClick={generateInvoice}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
      >
        Generate Invoice
      </button>

      {invoiceData && <InvoiceCanvas invoiceData={invoiceData} />}
    </div>
  );
};

export default InvoiceEditor;
