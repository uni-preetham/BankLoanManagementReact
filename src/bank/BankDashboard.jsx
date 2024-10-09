import React, { useEffect, useState } from "react";
import BankNavbar from "../navbar/BankNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RevenueChart from "./RevenueChart";
import Footer from "../pages/Footer";

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
        <div className="row">
          <div className="col-sm-4 bg-white d-flex justify-content-center py-5">
            <h1>{bank.bankName} Bank</h1>
          </div>
          <div className="col-sm-8">
            <div className="w-75 mx-auto">
              <RevenueChart />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BankDashboard;
