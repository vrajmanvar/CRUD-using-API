import React from "react";
import "./LogOut.css";
import { useNavigate } from "react-router-dom";

export const LogOut = ({ setLogOutModel }) => {
  const navigate = useNavigate();

  const handleCancelLogout = () => {
    setLogOutModel(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("LoginData");
    navigate("/");
    setLogOutModel(false);
  };

  return (
    <div className="logout-modal">
      <div className="backdrop" onClick={handleCancelLogout}></div>
      <div className="logout-content">
        <h4>Are you sure you want to logout?</h4>
        <div className="twobtn">
          <button
            className="btn btn-danger cancel"
            onClick={handleCancelLogout}
          >
            Cancel
          </button>
          <button type="button" class="btn btn-warning yellow" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
