const CompanySection = ({ data }) => {
  return (
    <div className="flex justify-between mb-12">

      {/* LEFT */}
      <h1 className="text-5xl font-bold tracking-wide">
        INVOICE
      </h1>

      {/* RIGHT */}
      <div className="text-right">
        <h2 className="font-semibold text-lg">
          {data.company.name}
        </h2>
        <p>{data.company.address}</p>
        <p>{data.company.email}</p>
        <p>{data.company.phone}</p>
      </div>

    </div>
  );
};

export default CompanySection;