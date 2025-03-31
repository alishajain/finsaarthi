import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClient } from "../API/ClientApi";
import { useSelector } from "react-redux";
import "../Styles/Modal.css";

const AddClient = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  const [clientData, setClientData] = useState({
    GSTNo: "",
    CompanyName: "",
    Address: "",
    PhoneNo: "",
    Email: "",
    UserId: userId,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await addClient(clientData);
      if (result.success) {
        setSuccess("Client added successfully!");
        setClientData({
          GSTNo: "",
          CompanyName: "",
          Address: "",
          PhoneNo: "",
          Email: "",
          UserId: userId,
        });
      }
    } catch (error) {
      setError("Error adding client. Please try again.");
      console.error("Error adding client:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal-btn" onClick={() => navigate("/home")}>Close</button>
        <h2>Add New Client</h2>

        {success && <div className="message success-message">{success}</div>}
        {error && <div className="message error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-row">
            <div className="modal-column">
              <label htmlFor="GSTNo">GST No</label>
              <input
                type="text"
                id="GSTNo"
                name="GSTNo"
                value={clientData.GSTNo}
                onChange={handleInputChange}
                placeholder="Enter GST No"
                required
              />
            </div>
            <div className="modal-column">
              <label htmlFor="CompanyName">Company Name</label>
              <input
                type="text"
                id="CompanyName"
                name="CompanyName"
                value={clientData.CompanyName}
                onChange={handleInputChange}
                placeholder="Enter Company Name"
                required
              />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-column">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                id="Address"
                name="Address"
                value={clientData.Address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                required
              />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-column">
              <label htmlFor="PhoneNo">Phone No</label>
              <input
                type="tel"
                id="PhoneNo"
                name="PhoneNo"
                value={clientData.PhoneNo}
                onChange={handleInputChange}
                placeholder="Enter Phone No"
                required
              />
            </div>
            <div className="modal-column">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={clientData.Email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit">Add Client</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
