import CompanySection from "./CompanySection";
import CustomerSection from "./CustomerSection";
import ItemsTable from "./ItemsTable";
import Notes from "./Notes";
import TotalSection from "./TotalSection";

const InvoiceCanvas = ({ invoiceData }) => {
  return (
    <div className="flex justify-center">
    <div
      id="invoice"
       className="bg-white shadow-xl p-12 text-gray-800"
      style={{
        width: "800px",
        minHeight: "1100px",
      }}
    >
      <CompanySection data={invoiceData} />
      <CustomerSection data={invoiceData} />
      <div className="border-b-2 border-blue-600 mb-8"></div>
      <ItemsTable data={invoiceData} />
      <TotalSection data={invoiceData} />
      <Notes></Notes>
    </div>
    </div>
  );
};

export default InvoiceCanvas;