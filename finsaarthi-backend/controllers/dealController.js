const db = require("../db/database");

// Add a new deal
const addDeal = async (req, res) => {
  const {
    DealDate,
    CompanyName,
    Total,
    GST,
    FreeService,
    Remarks,
    Status,
    UserId,
    Agent,
    Commission,
    Tentative_Delivery_Date,
    Interest,
    Machine_Warranty,
    Accessories,
    Others,
    Quantity,
    Invoice_Value,
    Cash,
    Bank,
    Booking_Amt,
    Before_Delivery,
    Balance_Payment,
  } = req.body;

  try {
    const query = `
      INSERT INTO deals (
        DealDate, CompanyName, Total, GST, FreeService, Remarks, Status, UserId,
        Agent, Commission, Tentative_Delivery_Date, Interest, Machine_Warranty, Accessories,
        Others, Quantity, Invoice_Value, Cash, Bank, Booking_Amt, Before_Delivery, Balance_Payment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      DealDate,
      CompanyName,
      Total,
      GST,
      FreeService,
      Remarks,
      Status,
      UserId,
      Agent,
      Commission,
      Tentative_Delivery_Date,
      Interest,
      Machine_Warranty,
      Accessories,
      Others,
      Quantity,
      Invoice_Value,
      Cash,
      Bank,
      Booking_Amt,
      Before_Delivery,
      Balance_Payment,
    ]);

    res.status(201).json({ message: "Deal added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all deals
const getAllDeals = async (req, res) => {
  try {
    const query = "SELECT * FROM deals";
    const [deals] = await db.query(query);
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get deals by CompanyName
const getAllDealsbyCompanyName = async (req, res) => {
  const { CompanyName } = req.params;

  try {
    const query = "SELECT * FROM deals WHERE CompanyName = ?";
    const [deals] = await db.query(query, [CompanyName]);

    if (deals.length === 0) {
      return res
        .status(404)
        .json({ message: "No deals found for the provided company" });
    }

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get deal by DealNo
const getDealByDealNo = async (req, res) => {
  const { dealNo } = req.params;

  try {
    const query = "SELECT * FROM deals WHERE DealNo = ?";
    const [deal] = await db.query(query, [dealNo]);

    if (deal.length === 0) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update deal by DealNo
const updateDeal = async (req, res) => {
  const { dealNo } = req.params;

  const {
    DealDate,
    CompanyName,
    Total,
    GST,
    FreeService,
    Remarks,
    Status,
    UserId,
    Agent,
    Commission,
    Tentative_Delivery_Date,
    Interest,
    Machine_Warranty,
    Accessories,
    Others,
    Quantity,
    Invoice_Value,
    Cash,
    Bank,
    Booking_Amt,
    Before_Delivery,
    Balance_Payment,
  } = req.body;

  try {
    const query = `
      UPDATE deals SET
        DealDate = ?, CompanyName = ?, Total = ?, GST = ?, FreeService = ?, Remarks = ?, Status = ?, UserId = ?,
        Agent = ?, Commission = ?, Tentative_Delivery_Date = ?, Interest = ?, Machine_Warranty = ?, Accessories = ?,
        Others = ?, Quantity = ?, Invoice_Value = ?, Cash = ?, Bank = ?, Booking_Amt = ?, Before_Delivery = ?, Balance_Payment = ?
      WHERE DealNo = ?
    `;

    const [result] = await db.query(query, [
      DealDate,
      CompanyName,
      Total,
      GST,
      FreeService,
      Remarks,
      Status,
      UserId,
      Agent,
      Commission,
      Tentative_Delivery_Date,
      Interest,
      Machine_Warranty,
      Accessories,
      Others,
      Quantity,
      Invoice_Value,
      Cash,
      Bank,
      Booking_Amt,
      Before_Delivery,
      Balance_Payment,
      dealNo,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ message: "Deal updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch the latest DealNo (auto-incremented value)
const getLatestDealNo = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT MAX(DealNo) AS DealNo FROM deals");
    const latestDealNo = (rows[0].DealNo || 0) + 1;
    res.json({ success: true, DealNo: latestDealNo });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching latest DealNo",
      error: err.message,
    });
  }
};

module.exports = {
  addDeal,
  getAllDeals,
  updateDeal,
  getDealByDealNo,
  getLatestDealNo,
  getAllDealsbyCompanyName,
};
