const TotalSection = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const taxAmount = (subtotal * data.tax) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="flex justify-end mb-12">
  <div className="w-72 space-y-2">

    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>₹{subtotal}</span>
    </div>

    <div className="flex justify-between">
      <span>Tax ({data.tax}%):</span>
      <span>₹{taxAmount}</span>
    </div>

    <div className="border-t pt-3 flex justify-between font-bold text-lg">
      <span>Total</span>
      <span>₹{grandTotal}</span>
    </div>

  </div>
</div>
  );
};

export default TotalSection;