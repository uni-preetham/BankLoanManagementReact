import React, { useEffect, useState } from "react";
import axios from "axios";
import BankNavbar from "./../navbar/BankNavbar";
import { TiTick, TiTimes } from "react-icons/ti";

const BankLoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = () => {
    axios
      .get(
        "http://localhost:8080/bankloanmanagementsystem/api/banks/verified-loan-requests",
        {
          withCredentials: true, // Set credentials to include cookies
        }
      )
      .then((response) => {
        setLoanRequests(response.data); // Set the manager data
      })
      .catch((error) => {
        console.error("Error fetching manager details:", error);
      });
  };

  const handleApproval = async (loanRequestId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/bankloanmanagementsystem/api/banks/approve/${loanRequestId}`,
        null,
        {
          params: { status },
        }
      );
      // Optionally, refresh the loan requests
      const updatedRequests = loanRequests.filter(
        (request) => request.requestId !== loanRequestId
      );
      setLoanRequests(updatedRequests);
      fetchLoanRequests();
    } catch (err) {
      setError("Error approving loan request");
    }
  };

  return (
    <>
      <BankNavbar />
      <div className="bg-light">
        <div className="container py-5">
          <h1 className="mb-4">Loan Requests</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="card shadow-sm">
            <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User</th>
                <th>Loan Type</th>
                <th>Requested Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.requestId}</td>
                  <td>
                    {request.user.firstName} {request.user.lastName}
                  </td>
                  <td>{request.loanType.loanName}</td>
                  <td>{request.requestedAmount}</td>
                  <td>{request.status}</td>
                  <td className="d-flex" style={{ gap: "10px" }}>
                    <button
                      className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                      onClick={() =>
                        handleApproval(request.requestId, "Approved")
                      }
                    >
                      <TiTick />
                    </button>
                    <button
                      className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                      onClick={() =>
                        handleApproval(request.requestId, "Rejected")
                      }
                    >
                      <TiTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankLoanRequests;
