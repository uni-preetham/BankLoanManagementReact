import React from "react";
import Logo from "./../logo.png";
import { Link, useNavigate } from "react-router-dom";

function BankNavbar() {
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
            onClick={() => navigate("/bank/dashboard")}
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
                <Link to="/bank/dashboard" className="nav-link">
                  Home
                </Link>
              </li>
               {/* Manager Dropdown */}
               <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn"
                  id="managerDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  Manage Managers
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="managerDropdown"
                >
                  <li>
                    <Link to="/bank/registermanager" className="dropdown-item">
                      Register Manager
                    </Link>
                  </li>
                  <li>
                    <Link to="/bank/allmanagers" className="dropdown-item">
                      View Managers
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Loan Type Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn"
                  id="loanTypeDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  Manage Loan Types
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="loanTypeDropdown"
                >
                  <li>
                    <Link to="/bank/addloantype" className="dropdown-item">
                      Add Loan Type
                    </Link>
                  </li>
                  <li>
                    <Link to="/bank/viewloans" className="dropdown-item">
                      View Loan Types
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/bank/loanrequest" className="nav-link">
                  Bank Req
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

export default BankNavbar;
