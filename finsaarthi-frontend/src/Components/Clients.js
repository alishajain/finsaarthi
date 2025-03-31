import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClients } from "../API/ClientApi";
import "../Styles/Table.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data.data);
        setFilteredClients(data.data); // Make sure you're updating with correct data structure
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Filter clients based on search input
  useEffect(() => {
    const results = clients.filter(
      (client) =>
        client.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.GSTNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchTerm, clients]);

  const handleShowDetails = (CompanyName) => {
    navigate(`/records`, { state: { CompanyName } });
  };

  return (
    <div className="table-container">
      <h1>All Clients</h1>
      <button className="back-btn" onClick={() => navigate("/home")}>
        Back
      </button>

      <div className="id-search-container">
        <label className="search-label">Search:</label>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Company Name or GST No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Clients Table */}
      <table className="tables-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>GST No</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <tr key={index}>
                <td>{client.CompanyName}</td>
                <td>{client.GSTNo}</td>
                <td>{client.PhoneNo}</td>
                <td>{client.Address}</td>
                <td>{new Date(client.Date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleShowDetails(client.CompanyName)}
                    className="details-btn"
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No clients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
