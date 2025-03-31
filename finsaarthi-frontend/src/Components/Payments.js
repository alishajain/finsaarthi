import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPayments } from "../API/PaymentApi";
import "../Styles/Table.css";

const Payments = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  // Function to format date as DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredPayments = (payments || []).filter((payment) =>
    payment.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1>All Payments</h1>
      <button className="back-btn" onClick={() => navigate("/home")}>
        Back
      </button>

      <div className="id-search-container">
        <label className="search-label">Search by Company Name:</label>
        <input
          type="text"
          className="search-input"
          placeholder="Enter company name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Payments Table */}
      <table className="tables-table">
        <thead>
          <tr>
            <th>Payment Date</th>
            <th>Company Name</th>
            <th>Kacha</th>
            <th>Pakka</th>
            <th>Total</th>
            <th>Remarks</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment.PaymentID}>
                <td>{formatDate(payment.PaymentDate)}</td>
                <td>{payment.CompanyName}</td>
                <td>{payment.Kacha}</td>
                <td>{payment.Pakka}</td>
                <td>{payment.Total}</td>
                <td>{payment.Remarks}</td>
                <td>{payment.UserId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No payments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
