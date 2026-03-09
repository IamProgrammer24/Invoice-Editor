import { mockInvoice } from "../data/mockInvoice.js";

export const getInvoices = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoice",
    });
  }
};

export const createInvoice = (req, res) => {
  res.status(201).json({
    message: "Create invoice API not implemented yet",
  });
};

export const deleteInvoice = (req, res) => {
  res.status(200).json({
    message: `Invoice ${req.params.id} deleted`,
  });
};
