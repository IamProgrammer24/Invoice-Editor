import express from "express";
import cors from "cors";
import invoiceRoutes from "./routes/invoiceRoutes.js";

const app = express();
// enable CORS
app.use(cors());

app.use(express.json());

app.use("/api/invoices", invoiceRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
