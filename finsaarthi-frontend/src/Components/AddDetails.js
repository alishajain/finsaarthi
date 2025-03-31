import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addDealDetails } from "../API/DetailsApi";
import "../Styles/Modal.css";

const AddDetails = ({ onClose, DealNo, onCloseDetails }) => {
  const userId = useSelector((state) => state.user.userId);

  const [formData, setFormData] = useState({
    DealNo: null,
    Model: "",
    Quantity: "",
    Price: "",
    Total: 0,
    UserId: userId,
  });

  // Update DealNo in formData when DealNo prop changes
  useEffect(() => {
    if (DealNo) {
      setFormData((prevData) => ({ ...prevData, DealNo: Number(DealNo) }));
    }
  }, [DealNo]);

  // Calculate Total whenever Quantity or Price changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      Total:
        (prevData.Quantity ? Number(prevData.Quantity) : 0) *
        (prevData.Price ? Number(prevData.Price) : 0),
    }));
  }, [formData.Quantity, formData.Price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDealDetails(formData);
      alert("Deal details added successfully");

      const userResponse = window.confirm("Do you want to add more details?");
      if (userResponse) {
        setFormData({
          DealNo: Number(DealNo),
          Model: "",
          Quantity: "",
          Price: "",
          Total: 0,
          UserId: userId,
        });
      } else {
        onClose();
        onCloseDetails(); // Call the callback function to update the total
      }
    } catch (error) {
      console.error("Error adding deal details", error);
      alert("Failed to add deal details");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
      onCloseDetails(); // Call the callback function to update the total
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Add Deal Details</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-row">
            <div className="modal-column">
              <label>Deal No</label>
              <input
                type="text"
                name="DealNo"
                value={formData.DealNo || ""}
                disabled
              />
            </div>
            <div className="modal-column">
              <label>Model</label>
              <input
                type="text"
                name="Model"
                value={formData.Model}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-column">
              <label>Quantity</label>
              <input
                type="number"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-column">
              <label>Price</label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="modal-row">
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
          <div className="button-container">
            <button type="submit">Save</button>
            <button type="button" className="close-modal-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
