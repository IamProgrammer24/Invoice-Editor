const CustomerSection = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">

      {/* Billed To */}
      <div>
        <p className="text-blue-600 font-semibold">
          Billed To
        </p>
        <p>{data.customer.name}</p>
        <p>{data.customer.address}</p>
      </div>

      {/* Date */}
      <div>
        <p className="text-blue-600 font-semibold">
          Date Issued
        </p>
        <p>{data.invoiceInfo.date}</p>
      </div>

      {/* Invoice Number */}
      <div>
        <p className="text-blue-600 font-semibold">
          Invoice Number
        </p>
        <p>{data.invoiceInfo.invoiceNumber}</p>
      </div>

      {/* Amount */}
      <div>
        <p className="text-blue-600 font-semibold">
          Amount Due
        </p>
        <p className="font-bold text-lg">
          ₹{data.total}
        </p>
      </div>

    </div>
  );
};

export default CustomerSection;