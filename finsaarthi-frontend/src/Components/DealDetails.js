import React, { useState, useEffect } from "react";
import { getDealDetailsByDealNo } from "../API/DetailsApi";
import "../Styles/Modal.css";
import "../Styles/Table.css";

const DealDetails = ({ DealNo, onClose }) => {
  const [dealDetails, setDealDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealDetails = async () => {
      try {
        const response = await getDealDetailsByDealNo(DealNo);
        setDealDetails(response);
      } catch (error) {
        setError("Failed to fetch deal details");
      } finally {
        setLoading(false);
      }
    };

    if (DealNo) {
      fetchDealDetails();
    }
  }, [DealNo]);

  if (!DealNo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="table-container">
            {Array.isArray(dealDetails) && dealDetails.length > 0 ? (
              <table className="tables-table">
                <thead>
                  <tr>
                    <th>Deal No</th>
                    <th>Model</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>User ID</th>
                    <th>Guage</th>
                    <th>Year</th>
                    <th>Invoice Value</th>
                    <th>GST Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dealDetails.map((deal, index) => (
                    <tr key={index}>
                      <td>{deal.DealNo}</td>
                      <td>{deal.Model}</td>
                      <td>{deal.Quantity}</td>
                      <td>{deal.Price}</td>
                      <td>{deal.Total}</td>
                      <td>{deal.UserId}</td>
                      <td>{deal.Guage}</td>
                      <td>{deal.year}</td>
                      <td>{deal.Invoice_Value}</td>
                      <td>{deal.GST_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No deal details available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealDetails;
