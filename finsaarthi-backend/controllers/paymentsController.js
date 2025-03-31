const db = require("../db/database");

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const [payments] = await db.query("SELECT * FROM payments ORDER BY PaymentDate DESC");
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        console.error("Error while fetching payments:", error);
        res.status(500).json({ success: false, message: "Server error while fetching payments." });
    }
};

// Get a single payment by ID
const getPaymentByCompany = async (req, res) => {
    try {
        const { CompanyName } = req.params;
        const [payment] = await db.query("SELECT * FROM payments WHERE CompanyName = ?", [CompanyName]);
        
        if (payment.length === 0) {
            return res.status(404).json({ success: false, message: "Payment not found." });
        }
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        console.error("Error while fetching payment:", error);
        res.status(500).json({ success: false, message: "Server error while fetching payment." });
    }
};

// Create a new payment
const createPayment = async (req, res) => {
    const { PaymentDate, CompanyName, Kacha, Pakka, Total, Remarks, UserId } = req.body;
    
    if (!PaymentDate || !CompanyName || Kacha === undefined || Pakka === undefined || !Total || !UserId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: PaymentDate, CompanyName, Kacha, Pakka, Total, and UserId are required."
        });
    }

    try {
        const result = await db.query(
            "INSERT INTO payments (PaymentDate, CompanyName, Kacha, Pakka, Total, Remarks, UserId) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [PaymentDate, CompanyName, Kacha, Pakka, Total, Remarks, UserId]
        );

        res.status(201).json({
            success: true,
            message: "Payment added successfully.",
            id: result.insertId,
        });
    } catch (error) {
        console.error("Error while adding payment:", error);
        res.status(500).json({ success: false, message: "Server error while adding payment." });
    }
};

// Update a payment
const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { PaymentDate, CompanyName, Kacha, Pakka, Total, Remarks, UserId } = req.body;
    
    if (!PaymentDate || !CompanyName || Kacha === undefined || Pakka === undefined || !Total || !UserId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: PaymentDate, CompanyName, Kacha, Pakka, Total, and UserId are required."
        });
    }

    try {
        const result = await db.query(
            "UPDATE payments SET PaymentDate = ?, CompanyName = ?, Kacha = ?, Pakka = ?, Total = ?, Remarks = ?, UserId = ?, WHERE id = ?",
            [PaymentDate, CompanyName, Kacha, Pakka, Total, Remarks, UserId, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Payment not found." });
        }

        res.status(200).json({ success: true, message: "Payment updated successfully." });
    } catch (error) {
        console.error("Error while updating payment:", error);
        res.status(500).json({ success: false, message: "Server error while updating payment." });
    }
};

// Delete a payment
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query("DELETE FROM payments WHERE id = ?", [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Payment not found." });
        }

        res.status(200).json({ success: true, message: "Payment deleted successfully." });
    } catch (error) {
        console.error("Error while deleting payment:", error);
        res.status(500).json({ success: false, message: "Server error while deleting payment." });
    }
};

module.exports = {
    getAllPayments,
    getPaymentByCompany,
    createPayment,
    updatePayment,
    deletePayment,
};
