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
    Tentative_Delivery_Date: "",
    CompanyName: "",
    Agent: "",
    Invoice_Value: 0,
    GST: "",
    Total: 0,
    Cash: 0,
    Bank: 0,
    Booking_Amt: 0,
    Before_Delivery: 0,
    Balance_Payment: 0,
    Interest: 0,
    FreeService: "",
    Machine_Warranty: "",
    Accessories: "",
    Others: "",
    Remarks: "",
    Status: "",
    Commission: 0,
    Quantity: 0,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDealData({ ...dealData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDeal({ ...dealData, DealNo: dealNo, Total: total });
      alert("Deal added successfully!");
      navigate("/home");
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
        setDealData((prevData) => ({
          ...prevData,
          Total: totalSum,
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
              {/* Deal Information */}
              <fieldset>
                <legend>Deal Information</legend>
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
                    <label>Tentative Delivery Date</label>
                    <input
                      type="date"
                      name="Tentative_Delivery_Date"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Client & Agent Info */}
              <fieldset>
                <legend>Client & Agent Info</legend>
                <div className="modal-row">
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
                  <div className="modal-column">
                    <label>Agent</label>
                    <input type="text" name="Agent" onChange={handleChange} />
                  </div>
                </div>
              </fieldset>

              {/* Financial Details */}
              <fieldset>
                <legend>Financial Details</legend>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Invoice Value</label>
                    <input
                      type="number"
                      name="Invoice_Value"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-column">
                    <label>GST</label>
                    <input type="number" name="GST" onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Total</label>
                    <input type="text" name="Total" value={total} disabled />
                  </div>
                </div>
              </fieldset>

              {/* Payment Breakdown */}
              <fieldset>
                <legend>Payment Breakdown</legend>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Cash</label>
                    <input type="number" name="Cash" onChange={handleChange} />
                  </div>
                  <div className="modal-column">
                    <label>Bank</label>
                    <input type="number" name="Bank" onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Booking Amount</label>
                    <input
                      type="number"
                      name="Booking_Amt"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-column">
                    <label>Before Delivery</label>
                    <input
                      type="number"
                      name="Before_Delivery"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Balance Payment</label>
                    <input
                      type="number"
                      name="Balance_Payment"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Additional Charges & Terms */}
              <fieldset>
                <legend>Additional Charges & Terms</legend>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Interest</label>
                    <input
                      type="number"
                      name="Interest"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-column">
                    <label>Free Service</label>
                    <input
                      type="text"
                      name="FreeService"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Machine Warranty</label>
                    <input
                      type="text"
                      name="Machine_Warranty"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-column">
                    <label>Accessories</label>
                    <input
                      type="text"
                      name="Accessories"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Miscellaneous */}
              <fieldset>
                <legend>Miscellaneous</legend>
                <div className="modal-row">
                  <div className="modal-column">
                    <label>Others</label>
                    <input type="text" name="Others" onChange={handleChange} />
                  </div>
                  <div className="modal-column">
                    <label>Remarks</label>
                    <textarea name="Remarks" onChange={handleChange}></textarea>
                  </div>
                </div>
              </fieldset>

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
