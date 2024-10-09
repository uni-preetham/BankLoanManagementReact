import React, { useEffect, useState } from "react";
import ManagerNavbar from "../navbar/ManagerNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./../pages/Footer"

function ManagerDashboard() {
  const [manager, setManager] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/bankloanmanagementsystem/api/manager/details",
        {
          withCredentials: true, // Set credentials to include cookies
        }
      )
      .then((response) => {
        setManager(response.data); // Set the manager data
      })
      .catch((error) => {
        navigate("/timeout");
        console.error("Error fetching manager details:", error);
      });
  }, []);

  return (
    <>
      <ManagerNavbar />
      <div className="bg-light">
        <div className="container manager d-flex align-items-center justify-content-center" style={{height:"80vh"}}>
          <h1>Hello {manager.firstName}</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManagerDashboard;
