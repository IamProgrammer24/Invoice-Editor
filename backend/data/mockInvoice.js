export const mockInvoice = {
  company: {
    name: "Tech Solutions Pvt Ltd",
    address: "Gwalior, MP, India",
    email: "contact@techsolutions.com",
  },

  customer: {
    name: "Rahul Sharma",
    address: "Delhi, India",
  },

  invoiceInfo: {
    invoiceNumber: "INV-101",
    date: "27 Feb 2026",
  },

  items: [
    { name: "Website Development", qty: 1, price: 2000 },
    { name: "Hosting (1 Year)", qty: 1, price: 3000 },
  ],

  tax: 18,
};
