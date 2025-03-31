const db = require("../db/database");

// Add a new client
const addClient = async (req, res) => {
  const { GSTNo, CompanyName, Address, PhoneNo, Email, UserId } = req.body;

  if (!GSTNo || !CompanyName || !Address || !PhoneNo || !Email || !UserId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: GSTNo, CompanyName, Address, PhoneNo, Email, and UserId are required.",
    });
  }

  try {
    // Insert new client into the database
    const result = await db.query(
      "INSERT INTO clients (GSTNo, CompanyName, Address, PhoneNo, Email, UserId) VALUES (?, ?, ?, ?, ?, ?)",
      [GSTNo, CompanyName, Address, PhoneNo, Email, UserId]
    );

    // Return success response with the inserted client data
    res.status(201).json({
      success: true,
      message: "Client added successfully.",
      id: result.insertId,
      GSTNo: GSTNo,
    });
  } catch (err) {
    console.error('Error while adding client:', err);
    res.status(500).json({
      success: false,
      message: "Server error while adding client.",
    });
  }
};

// Update client details
const updateClient = async (req, res) => {
  const { GSTNo, CompanyName, Address, PhoneNo, Email, UserId } = req.body;

  if (!GSTNo || !CompanyName || !Address || !PhoneNo || !Email || !UserId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: GSTNo, CompanyName, Address, PhoneNo, Email, and UserId are required.",
    });
  }

  try {
    // Update client details
    const result = await db.query(
      "UPDATE clients SET CompanyName = ?, Address = ?, PhoneNo = ?, Email = ?, UserId = ? WHERE GSTNo = ?",
      [CompanyName, Address, PhoneNo, Email, UserId, GSTNo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Client not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client updated successfully.",
    });
  } catch (err) {
    console.error('Error while updating client:', err);
    res.status(500).json({
      success: false,
      message: "Server error while updating client.",
    });
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const [clients] = await db.query("SELECT * FROM clients");

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (err) {
    console.error('Error while fetching clients:', err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching clients.",
    });
  }
};

const getCompanyName = async (req, res) => {
  try {
    const [clients] = await db.query("SELECT CompanyName FROM clients");

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (err) {
    console.error('Error while fetching Company Names:', err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Company Names.",
    });
  }
};
module.exports = {
  addClient,
  updateClient,
  getAllClients,
  getCompanyName,
};
