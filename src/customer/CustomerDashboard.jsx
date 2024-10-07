import React, { useEffect, useState } from "react";
import UserNavbar from "../navbar/UserNavbar";
import BankDetails from "../bank/BankDetails";
import LoanEMICalculator from "./LoanEMICalculator";
import { useNavigate } from "react-router-dom";
import AccountDetails from "./AccountDetails";
import Footer from "./../pages/Footer"

function CustomerDashboard() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:8080/bankloanmanagementsystem/api/user/details", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error("Failed to fetch user details");
        }
      })
      .then((data) => {
        setUser(data); // Set the user's first name
      })
      .catch((error) => {
        navigate("/timeout")
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <>
    <UserNavbar />
    <div className="bg-light">
      <div className="container">
        {/* Display a personalized message */}
        <h1 className="px-4 pt-4 fw-bold display-6">Hi {user.firstName}!</h1>
        <LoanEMICalculator />
        <hr />
        <BankDetails />
        <hr />
        <AccountDetails />
        {/* <EMIDetails /> */}
        
      </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerDashboard;
