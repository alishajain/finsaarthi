import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addDealDetails } from "../API/DetailsApi";
import "../Styles/Modal.css";

const AddDetails = ({ onClose, DealNo, onCloseDetails }) => {
  const userId = useSelector((state) => state.user.userId);

  const [rows, setRows] = useState([
    {
      DealNo: DealNo ? Number(DealNo) + 1 : null,
      Model: "",
      Quantity: "",
      Price: "",
      Total: 0,
      UserId: userId,
      Guage: "",
      year: "",
      Invoice_Value: "",
      GST_value: "",
    },
  ]);

  // Update DealNo only once on change
  useEffect(() => {
    if (DealNo) {
      setRows((prevRows) =>
        prevRows.map((row) => ({ ...row, DealNo: Number(DealNo) + 1 }))
      );
    }
  }, [DealNo]);

  // Auto-calculate GST_value and Total
  useEffect(() => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        const invoice = parseFloat(row.Invoice_Value) || 0;
        const gstValue = parseFloat((invoice * 0.18).toFixed(2));
        const qty = parseFloat(row.Quantity) || 0;
        const price = parseFloat(row.Price) || 0;
        const total = parseFloat((qty * (price + gstValue)).toFixed(2));

        return {
          ...row,
          GST_value: gstValue,
          Total: total,
        };
      })
    );
  }, [
    // Only track the fields needed to recalculate
    ...rows.map((r) => r.Quantity),
    ...rows.map((r) => r.Price),
    ...rows.map((r) => r.Invoice_Value),
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [name]: value };
      return newRows;
    });
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = 2000; y <= currentYear + 5; y++) {
      years.push(y);
    }
    return years;
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        DealNo: DealNo ? Number(DealNo) + 1: null,
        Model: "",
        Quantity: "",
        Price: "",
        Total: 0,
        UserId: userId,
        Guage: "",
        year: "",
        Invoice_Value: "",
        GST_value: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const row of rows) {
        await addDealDetails({
          ...row,
          Quantity: Number(row.Quantity),
          Price: Number(row.Price),
          Total: Number(row.Total),
          Invoice_Value: Number(row.Invoice_Value),
          GST_value: Number(row.GST_value),
          UserId: userId,
          DealNo: Number(row.DealNo),
        });
      }

      alert("Deal details added successfully");

      const userResponse = window.confirm("Do you want to add more details?");
      if (userResponse) {
        setRows([
          {
            DealNo: Number(DealNo) + 1,
            Model: "",
            Quantity: "",
            Price: "",
            Total: 0,
            UserId: userId,
            Guage: "",
            year: "",
            Invoice_Value: "",
            GST_value: "",
          },
        ]);
      } else {
        onClose();
        onCloseDetails();
      }
    } catch (error) {
      console.error("Error adding deal details", error);
      alert("Failed to add deal details");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
      onCloseDetails();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Add Deal Details</h2>
        <form onSubmit={handleSubmit}>
          <table className="tables-table">
            <thead>
              <tr>
                <th>Deal No</th>
                <th>Model</th>
                <th>Guage</th>
                <th>Year</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Invoice Value</th>
                <th>GST Value</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input type="text" value={row.DealNo || ""} disabled />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Model"
                      value={row.Model}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Guage"
                      value={row.Guage}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <select
                      name="year"
                      value={row.year}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="">Select Year</option>
                      {getYearOptions().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="Quantity"
                      value={row.Quantity}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="Price"
                      value={row.Price}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="Invoice_Value"
                      value={row.Invoice_Value}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="GST_value"
                      value={row.GST_value}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="Total"
                      value={row.Total}
                      disabled
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container mt-4">
            <button type="button" onClick={handleAddRow}>
              Add New Row
            </button>
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
