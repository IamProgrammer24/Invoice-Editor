import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import connectDB from "./utils/db.js";

dotenv.config({});
const app = express();
// enable CORS
app.use(cors());

app.use(express.json());

app.use("/api/invoices", invoiceRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server running on port 5000");
});
