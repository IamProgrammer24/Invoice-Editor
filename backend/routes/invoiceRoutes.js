import express from "express";

import {
  getInvoices,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getInvoices);
router.post("/", createInvoice);
router.delete("/:id", deleteInvoice);
router.put("/:id", updateInvoice);

export default router;
