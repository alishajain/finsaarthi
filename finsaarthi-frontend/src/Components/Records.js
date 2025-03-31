import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDealByCompanyName } from "../API/DealApi";
import { getPaymentByCompanyName } from "../API/PaymentApi";
import DealDetails from "./DealDetails";
import "../Styles/Records.css";

const Records = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const CompanyName = location.state.CompanyName;

  const [deal, setDeal] = useState(null);
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await getPaymentByCompanyName(CompanyName);
        setPayment(response.data);
      } catch (error) {
        setError("Failed to fetch payment details");
        setLoading(false);
      }
    };

    const fetchDeal = async () => {
      try {
        setLoading(true);
        const response = await getDealByCompanyName(CompanyName);
        setDeal(response);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch deal data");
        setLoading(false);
      }
    };

    if (CompanyName) {
      fetchPayment();
      fetchDeal();
    }
  }, [CompanyName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleBackButton = () => {
    navigate(`/clients`);
  };

  const handleShowDetails = (DealNo) => {
    setSelectedDeal(DealNo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDeal(null);
  };

  return (
    <div className="records-container">
      <button className="back-button" onClick={handleBackButton}>
        Back
      </button>
      <div className="records-left-half">
        <h2>Deals</h2>
        {deal && deal.length > 0 ? (
          <table className="records-table">
            <thead>
              <tr>
                <th>Deal Date</th>
                <th>Kacha</th>
                <th>Pakka</th>
                <th>Total</th>
                <th>GST</th>
                <th>Free Service</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deal.map((dealItem) => (
                <tr key={dealItem.DealNo}>
                  <td>{formatDate(dealItem.DealDate)}</td>
                  <td>{dealItem.Kacha}</td>
                  <td>{dealItem.Pakka}</td>
                  <td>{dealItem.Total}</td>
                  <td>{dealItem.GST}</td>
                  <td>{dealItem.FreeService}</td>
                  <td>{dealItem.Status}</td>
                  <td>{dealItem.Remarks}</td>
                  <td>
                    <button
                      onClick={() => handleShowDetails(dealItem.DealNo)}
                      className="details-btn"
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No deals found</p>
        )}
      </div>
      <div className="records-right-half">
        <h2>Payments</h2>
        <table className="records-table">
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Kacha</th>
              <th>Pakka</th>
              <th>Total</th>
              <th>Remarks</th>
              <th>UserId</th>
            </tr>
          </thead>
          <tbody>
            {payment.length > 0 ? (
              payment.map((paymentItem) => (
                <tr key={paymentItem.PaymentID}>
                  <td>{formatDate(paymentItem.PaymentDate)}</td>
                  <td>{paymentItem.Kacha}</td>
                  <td>{paymentItem.Pakka}</td>
                  <td>{paymentItem.Total}</td>
                  <td>{paymentItem.Remarks}</td>
                  <td>{paymentItem.UserId}</td>
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
      {isModalOpen && (
        <DealDetails DealNo={selectedDeal} onClose={closeModal} />
      )}
    </div>
  );
};

export default Records;
