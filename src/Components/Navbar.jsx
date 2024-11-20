import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { LogOut } from "../Pages/LogOut";
import { createPortal } from "react-dom";

export const Navbar = () => {
  const [logOutModel, setLogOutModel] = useState(false);

  const LocalData = JSON.parse(localStorage.getItem("LoginData")) || {};
  const userRole = LocalData.role || "User";
  console.log(userRole);

  const handleLogOut = () => {
    setLogOutModel(true);
  };

  return (
    <nav className="nav-container">
      <div className="home">
        <Link to="/home">Home</Link>
      </div>

      {userRole === "Admin" && (
        <>
          <div className="insert">
            <Link to="/insert">Insert</Link>
          </div>
        </>
      )}
      <div className="logout">
        {/* Updated button text and style */}
        <button className="btn btn-danger" onClick={handleLogOut}>
          Sign Out
        </button>
      </div>
      {logOutModel &&
        createPortal(
          <LogOut setLogOutModel={setLogOutModel} />,
          document.getElementById("model")
        )}
    </nav>
  );
};
