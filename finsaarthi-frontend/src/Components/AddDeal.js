import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDeal, latestDealNo } from "../API/DealApi";
import { getTotalByDealNo } from "../API/DetailsApi";
import { getNames } from "../API/ClientApi";
import AddDetails from "./AddDetails";
import "../Styles/Modal.css";

const AddDeal = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  const [dealData, setDealData] = useState({
    DealDate: "",
    CompanyName: "",
    Total: 0,
    GST: "",
    Kacha: 0,
    Pakka: 0,
    FreeService: "",
    Remarks: "",
    Status: "",
    UserId: userId,
  });

  const [names, setNames] = useState([]);
  const [dealNo, setDealNo] = useState("");
  const [total, setTotal] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    const fetchDealNo = async () => {
      try {
        const response = await latestDealNo();
        setDealNo(response.DealNo);
      } catch (error) {
        console.error("Error fetching Deal Number:", error);
      }
    };

    const fetchNames = async () => {
      try {
        const response = await getNames();
        setNames(response.data);
      } catch (error) {
        console.error("Error fetching company names:", error);
      }
    };

    fetchNames();
    fetchDealNo();
  }, []);

  // Update Pakka when Total changes
  useEffect(() => {
    setDealData((prevData) => ({
      ...prevData,
      Pakka: total - prevData.Kacha, // Pakka = Total - Kacha
    }));
  }, [total]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Kacha") {
      const kachaValue = Number(value);
      // Ensure Kacha does not exceed Total
      if (kachaValue <= total) {
        setDealData((prevData) => ({
          ...prevData,
          Kacha: kachaValue,
          Pakka: total - kachaValue, // Update Pakka automatically
        }));
      }
    } else {
      setDealData({ ...dealData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDeal({ ...dealData, DealNo: dealNo, Total: total });
      alert("Deal added successfully!");
      navigate("/home"); // Navigate to home after successful submission
    } catch (error) {
      alert("Error adding deal: " + error.message);
    }
  };

  const handleClose = () => {
    navigate("/home");
  };

  const handleCloseDetails = async () => {
    try {
      const response = await getTotalByDealNo(dealNo);
      if (Array.isArray(response)) {
        const totalSum = response.reduce(
          (acc, item) => acc + (item.Total || 0),
          0
        );
        setTotal(totalSum);
        // Update Pakka when Total changes
        setDealData((prevData) => ({
          ...prevData,
          Pakka: totalSum - prevData.Kacha,
        }));
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching total:", error);
    }
    setShowDetails(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {showDetails ? (
          <AddDetails
            DealNo={Number(dealNo)}
            onClose={handleCloseDetails}
            onCloseDetails={handleCloseDetails}
          />
        ) : (
          <>
            <h2>Add New Deal</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-row">
                <div className="modal-column">
                  <label>Deal Date</label>
                  <input
                    type="date"
                    name="DealDate"
                    onChange={handleChange}
                    required
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
                  <label>Total</label>
                  <input type="text" name="Total" value={total} disabled />
                </div>
                <div className="modal-column">
                  <label>GST</label>
                  <input type="number" name="GST" onChange={handleChange} />
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-column">
                  <label>Kacha</label>
                  <input
                    type="number"
                    name="Kacha"
                    value={dealData.Kacha}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-column">
                  <label>Pakka</label>
                  <input
                    type="number"
                    name="Pakka"
                    value={dealData.Pakka}
                    disabled
                  />
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-column">
                  <label>Free Service</label>
                  <input
                    type="text"
                    name="FreeService"
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-column">
                  <label>Status</label>
                  <input
                    type="text"
                    name="Status"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-column">
                  <label>Remarks</label>
                  <textarea name="Remarks" onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="button-container">
                <button type="submit">Add Deal</button>
                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddDeal;
