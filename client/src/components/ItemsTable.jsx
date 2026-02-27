const ItemsTable = ({ data }) => {
  const total = data.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <table className="w-full mb-12">
  <thead>
    <tr className="text-blue-600 text-sm">
      <th className="text-left pb-3">DESCRIPTION</th>
      <th>RATE</th>
      <th>QTY</th>
      <th className="text-right">AMOUNT</th>
    </tr>
  </thead>

  <tbody>
    {data.items.map((item, i) => (
      <tr key={i} className="border-t">
        <td className="py-4">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">
            Service description
          </p>
        </td>

        <td className="text-center">
          ₹{item.price}
        </td>

        <td className="text-center">
          {item.qty}
        </td>

        <td className="text-right">
          ₹{item.qty * item.price}
        </td>
      </tr>
    ))}
  </tbody>
</table>
  );
};

export default ItemsTable;