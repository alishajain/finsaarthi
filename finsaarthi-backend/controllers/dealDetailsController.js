const db = require("../db/database");

// Add deal details
const addDealDetail = async (req, res) => {
  const {
    DealNo,
    Model,
    Quantity,
    Price,
    Total,
    UserId,
    Guage,
    year,
    Invoice_Value,
    GST_value
  } = req.body;

  try {
    const query = `
      INSERT INTO deal_details 
      (DealNo, Model, Quantity, Price, Total, UserId, Guage, year, Invoice_Value, GST_value)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      DealNo,
      Model,
      Quantity,
      Price,
      Total,
      UserId,
      Guage,
      year,
      Invoice_Value,
      GST_value
    ]);
    res.status(201).json({ message: "Deal detail added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get deal details by DealNo
const getDealDetailsByDealNo = async (req, res) => {
  const { dealNo } = req.params;

  try {
    const query = "SELECT * FROM deal_details WHERE DealNo = ?";
    const [details] = await db.query(query, [dealNo]);
    if (details.length === 0) {
      return res.status(404).json({ message: "No deal details found" });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total by DealNo
const getTotalByDealNo = async (req, res) => {
  const { dealNo } = req.params;

  try {
    const query = "SELECT Total FROM deal_details WHERE DealNo = ?";
    const [details] = await db.query(query, [dealNo]);
    if (details.length === 0) {
      return res.status(404).json({ message: "Total not found" });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update deal detail by DealNo
const updateDealDetail = async (req, res) => {
  const { dealNo } = req.params;
  const {
    Model,
    Quantity,
    Price,
    Total,
    UserId,
    Guage,
    year,
    Invoice_Value,
    GST_value
  } = req.body;

  try {
    const query = `
      UPDATE deal_details 
      SET Model = ?, Quantity = ?, Price = ?, Total = ?, UserId = ?, Guage = ?, year = ?, Invoice_Value = ?, GST_value = ?
      WHERE DealNo = ?
    `;
    const [result] = await db.query(query, [
      Model,
      Quantity,
      Price,
      Total,
      UserId,
      Guage,
      year,
      Invoice_Value,
      GST_value,
      dealNo
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Deal detail not found" });
    }
    res.status(200).json({ message: "Deal detail updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addDealDetail,
  getDealDetailsByDealNo,
  updateDealDetail,
  getTotalByDealNo,
};
