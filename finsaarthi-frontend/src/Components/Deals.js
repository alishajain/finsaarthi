import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDeals } from "../API/DealApi";
import "../Styles/Table.css";

const Deals = () => {
  const navigate = useNavigate();
  
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDeals, setFilteredDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getAllDeals();
        setDeals(data);
        setFilteredDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };
    fetchDeals();
  }, []);

  // Filter deals based on search input
  useEffect(() => {
    const results = deals.filter(
      (deal) =>
        deal.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDeals(results);
  }, [searchTerm, deals]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined dates
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="table-container">
      <h1>All Deals</h1>
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/home")}>
        Back
      </button>

      {/* Search Bar */}
      <div className="id-search-container">
        <label className="search-label">Search:</label>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Company or Model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Deals Table */}
      <table className="tables-table">
        <thead>
          <tr>
            <th>Deal No</th>
            <th>Deal Date</th>
            <th>Company Name</th>
            <th>Total</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <tr key={deal.DealNo}>
                <td>{deal.DealNo}</td>
                <td>{formatDate(deal.DealDate)}</td>
                <td>{deal.CompanyName}</td>
                <td>{deal.Total}</td>
                <td>{deal.Status}</td>
                <td>{deal.Remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No deals found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Deals;
