import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../navbar/UserNavbar";
import Footer from "../pages/Footer";

const EMIDetails = () => {
  const navigate = useNavigate();
  const { accountId } = useParams(); // Access accountId from URL parameters
  const [userId, setUserId] = useState(null);
  const [accounts, setAccounts] = useState({}); // Initialize as an empty object
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/bankloanmanagementsystem/api/user/details", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user details");
        }
      })
      .then((data) => {
        setUserId(data.userId);
        fetchEMIDetails(data.userId);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const fetchEMIDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bankloanmanagementsystem/api/account/account/${accountId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching account details");
      }

      const data = await response.json(); // Parse the JSON response
      setAccounts(data);
    } catch (err) {
      setError("Error fetching account details");
      console.error(err);
    }
  };

  console.log(accounts); // Check the structure of accounts here

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!accounts.approvedAmount)
    return <div className="text-center">Loading...</div>; // Wait for accounts to be populated

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="mb-4">EMI Details</h3>
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h5 className="card-title">Loan Information</h5>
            <div className="row">
              <div className="col-md-4">
                <p>
                  <strong>Approved Amount:</strong> ₹{accounts.approvedAmount}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>EMI Amount:</strong> ₹{accounts.emiAmount}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>Total Payment:</strong> ₹{accounts.totalPayment}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Payment Schedule</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Month</th>
                    <th>EMI</th>
                    <th>Principal Payment</th>
                    <th>Interest Payment</th>
                    <th>Outstanding Principal</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.paymentSchedule.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.month}</td>
                      <td>₹{payment.emi}</td>
                      <td>₹{payment.principalPayment}</td>
                      <td>₹{payment.interestPayment}</td>
                      <td>₹{payment.outstandingPrincipal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EMIDetails;
