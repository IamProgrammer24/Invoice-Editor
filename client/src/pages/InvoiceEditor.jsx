import { useState } from "react";
import { mockInvoice } from "../data/invoiceData";
import InvoiceCanvas from "../components/InvoiceCanvas";

const InvoiceEditor = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  const generateInvoice = () => {
    // Later this becomes API call
    setInvoiceData(mockInvoice);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      
      <button
        onClick={generateInvoice}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
      >
        Generate Invoice
      </button>

      {invoiceData && (
        <InvoiceCanvas invoiceData={invoiceData} />
      )}
    </div>
  );
};

export default InvoiceEditor;