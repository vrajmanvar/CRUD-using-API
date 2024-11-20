// import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Detail.css"

export const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const { item } = location.state;

  if (!item) {
    return <h1>No details available.</h1>;
  }

  // Function to navigate back to the home page
  const goToHomePage = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div className="detail-container">
      <h1>{item.title}</h1>
      {item.image && (
        <img src={item.image} alt={item.title} className="detail-image" />
      )}
      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Created By:</strong> {item.createdBy}
      </p>
      <button onClick={goToHomePage}>Go to HomePage</button>{" "}
      {/* Attach the onClick handler */}
    </div>
  );
};
