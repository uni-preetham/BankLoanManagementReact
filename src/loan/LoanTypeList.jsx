import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BankNavbar from "../navbar/BankNavbar";
import { TiPencil, TiTrash } from "react-icons/ti";

function LoanTypeList() {
  const [loanTypes, setLoanTypes] = useState([]);
  const navigate = useNavigate();

  // Fetch loan types on component mount
  useEffect(() => {
    fetchLoanTypes();
  }, []);

  const fetchLoanTypes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/bankloanmanagementsystem/api/loans/all", // Adjust endpoint as necessary
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setLoanTypes(data);
    } catch (error) {
      console.error("Failed to fetch loan types", error);
    }
  };

  // Handle delete loan type
  const handleDelete = async (loanTypeId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bankloanmanagementsystem/api/loans/delete/${loanTypeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Loan type deleted successfully");
        fetchLoanTypes(); // Refresh the list after deletion
      } else {
        alert("Failed to delete loan type");
      }
    } catch (error) {
      console.error("Error deleting loan type", error);
    }
  };

  // Handle edit loan type
  const handleEdit = (loanTypeId) => {
    // Redirect to the edit page for loan type
    navigate(`/bank/editloantype/${loanTypeId}`);
  };

  return (
    <>
    <BankNavbar />
      <div className="bg-light">
        <div className="container py-5">
          <h2>Loan Types</h2>
          {loanTypes.length > 0 ? (
            <table className="table ">
              <thead>
                <tr>
                  <th>Loan Name</th>
                  <th>Interest Rate</th>
                  <th>Max Amount</th>
                  <th>Duration (Years)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanTypes.map((loanType) => (
                  <tr key={loanType.loanTypeId}>
                    <td>{loanType.loanName}</td>
                    <td>{loanType.interestRate}%</td>
                    <td>{loanType.maxAmount}</td>
                    <td>{loanType.durationYears}</td>
                    <td className="d-flex" style={{ gap: "10px" }}>
                      <button
                        className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                        onClick={() => handleEdit(loanType.loanTypeId)}
                      >
                       <TiPencil />
                      </button>
                      <button
                        className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                        onClick={() => handleDelete(loanType.loanTypeId)}
                      >
                        <TiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No loan types found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LoanTypeList;
