import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPayment } from "../API/PaymentApi";
import { getNames } from "../API/ClientApi";
import { useSelector } from "react-redux";
import "../Styles/Modal.css";

const AddPayment = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  const initialFormState = {
    PaymentDate: "",
    CompanyName: "",
    Kacha: 0,
    Pakka: 0,
    Total: 0,
    Remarks: "",
    UserId: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [names, setNames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      setFormData((prevData) => ({ ...prevData, UserId: userId }));
    }

    const fetchNames = async () => {
      try {
        const response = await getNames();
        setNames(response.data);
      } catch (error) {
        console.error("Error fetching company names:", error);
      }
    };

    fetchNames();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === "number" ? Number(value) || 0 : value;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };

      if (name === "Kacha" || name === "Pakka") {
        updatedData.Total =
          (Number(updatedData.Kacha) || 0) + (Number(updatedData.Pakka) || 0);
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.PaymentDate || !formData.CompanyName || formData.Total <= 0) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await addPayment(formData);
      alert("Payment Added Successfully!");

      // ✅ Reset form after successful submission
      setFormData(initialFormState);
    } catch (error) {
      console.error("Payment API Error:", error.response || error);
      setError(
        error.response?.data?.message ||
          "Failed to add payment. Please try again."
      );
    }
  };

  // Navigate to home page on Close button click
  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal-btn" onClick={handleClose}>
          Close
        </button>
        <h2>Add Payment</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-row">
            <div className="modal-column">
              <label>Payment Date</label>
              <input
                type="date"
                name="PaymentDate"
                value={formData.PaymentDate}
                onChange={handleChange}
              />
            </div>
            <div className="modal-column">
              <label>Company Name</label>
              <select name="CompanyName" onChange={handleChange} required>
                <option value="">Select Company Name</option>
                {names.map((name, index) => (
                  <option key={index} value={name.CompanyName}>
                    {name.CompanyName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-column">
              <label>Kacha</label>
              <input
                type="number"
                name="Kacha"
                value={formData.Kacha}
                onChange={handleChange}
              />
            </div>
            <div className="modal-column">
              <label>Pakka</label>
              <input
                type="number"
                name="Pakka"
                value={formData.Pakka}
                onChange={handleChange}
              />
            </div>
            <div className="modal-column">
              <label>Total</label>
              <input
                type="number"
                name="Total"
                value={formData.Total}
                disabled
              />
            </div>
          </div>
          <div className="modal-column">
            <label>Remarks</label>
            <textarea
              name="Remarks"
              value={formData.Remarks}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="button-container">
            <button type="submit">Add Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
