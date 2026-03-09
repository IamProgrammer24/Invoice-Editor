import { mockInvoice } from "../data/mockInvoice.js";

import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);

    const savedInvoice = await invoice.save();

    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.status(200).json({
      data: invoices[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
      error: error.message,
    });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update invoice",
      error: error.message,
    });
  }
};

export const deleteInvoice = (req, res) => {
  res.status(200).json({
    message: `Invoice ${req.params.id} deleted`,
  });
};
