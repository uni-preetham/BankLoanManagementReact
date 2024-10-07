import React from "react";
import Logo from "./../logo.png";
import { Link, useNavigate } from "react-router-dom";

function ManagerNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the backend to invalidate the session
      await fetch(
        "http://localhost:8080/bankloanmanagementsystem/api/user/logout",
        {
          // Adjust the URL to match your backend
          method: "POST", // Use the appropriate HTTP method (GET/POST)
          credentials: "include", // Include credentials for session-based authentication
        }
      );

      // Clear the session storage
      sessionStorage.clear(); // Clear all session data

      // Redirect to the login page
      navigate("/login"); // Replace with your login route
    } catch (error) {
      console.error("Logout failed", error);
      // Handle errors, e.g., show a notification or alert
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border border-bottom">
        <div className="container">
          <button
            className="navbar-brand me-5 btn"
            onClick={() => navigate("/manager/dashboard")}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <img src={Logo} alt="logo" className="App-logo" />
          </button>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/manager/dashboard" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/manager/approvals" className="nav-link">
                  Approve
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {/* User Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/manager/editprofile" className="dropdown-item">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default ManagerNavbar;
