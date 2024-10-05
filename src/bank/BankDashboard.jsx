import React, { useEffect, useState } from 'react'
import BankNavbar from '../navbar/BankNavbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BankDashboard() {
  const [bank, setBank] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:8080/bankloanmanagementsystem/api/banks/details", {
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
    <div>
      <BankNavbar />
      <h1>{bank.bankId}</h1>
    </div>
  )
}

export default BankDashboard