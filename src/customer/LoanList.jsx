import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../navbar/UserNavbar";
import Footer from "../pages/Footer";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/bankloanmanagementsystem/api/loan-requests/userloans",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        setLoans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h2 className="mb-4">Your Loan Applications</h2>
        {loans.length === 0 ? (
          <p>No loans applied yet.</p>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Loan Name</th>
                    <th>Requested Amount</th>
                    <th>Status</th>
                    <th>Request Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.requestId}>
                      <td>{loan.loanType.loanName}</td>
                      <td>{loan.requestedAmount}</td>
                      <td>{loan.status}</td>
                      <td>{new Date(loan.requestDate).toLocaleDateString()}</td>
                      <td>
                        {loan.approvalDate
                          ? new Date(loan.approvalDate).toLocaleDateString()
                          : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LoanList;
