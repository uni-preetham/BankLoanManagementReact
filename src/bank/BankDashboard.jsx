import React, { useEffect, useState } from "react";
import BankNavbar from "../navbar/BankNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RevenueChart from "./RevenueChart";

function BankDashboard() {
  const [bank, setBank] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/bankloanmanagementsystem/api/banks/details", {
        withCredentials: true, // Set credentials to include cookies
      })
      .then((response) => {
        setBank(response.data); // Set the manager data
      })
      .catch((error) => {
        navigate("/timeout");
        console.error("Error fetching manager details:", error);
      });
  }, []);
  return (
    <>
    <BankNavbar />
      <div className="bg-light">
        <div className="container">
          <h1>{bank.bankName}</h1>
          <div className="w-75">
          <RevenueChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default BankDashboard;
