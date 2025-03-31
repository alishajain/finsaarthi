import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1 className="home-header">Welcome</h1>

      {/* Container with buttons */}
      <div className="home-buttons-container">
        <div className="home-button">
          <Link to="/add-client">
            <button className="home-btn">Add Client</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/add-deal">
            <button className="home-btn">Add Deal</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/add-payment">
            <button className="home-btn">Add Payment</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/clients">
            <button className="home-btn">Display All Clients</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/deals">
            <button className="home-btn">Display All Deals</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/payments">
            <button className="home-btn">Display All Payments</button>
          </Link>
        </div>
        <div className="home-button">
          <button className="home-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
