import React, { useEffect, useState } from 'react';
import ManagerNavbar from '../navbar/ManagerNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManagerDashboard() {
  const [manager, setManager] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:8080/bankloanmanagementsystem/api/manager/details", {
      withCredentials: true, // Set credentials to include cookies
    })
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
      <h1>{manager.firstName}</h1>
      <div>ManagerDashboard</div>
    </>
  );
}

export default ManagerDashboard;
