import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/bankloanmanagementsystem/api/account/accountdetails",
          {
            withCredentials: true, // Include credentials for session management
          }
        );
        setAccounts(response.data);
      } catch (err) {
        setError("Error fetching account details");
        console.error(err);
      }
    };

    fetchAccounts();
  }, []);

  const handleViewEMIDetails = (accountId) => {
    navigate(`/emi-details/${accountId}`); // Navigate to EMIDetails with account ID
  };

  return (
    <div>
      <h1 className="py-4 fw-bold display-6">Your Loan Accounts</h1>
      {error && <p>{error}</p>}
      {accounts.length > 0 ? (
        <div className="row">
          {accounts.map((account) => (
            <div key={account.accountId} className="col-md-4 mb-4">
              <div className="card" style={{backgroundColor: "rgba(255, 114, 94, 0.1)"}}>
                <div className="card-body">
                  <h5 className="card-title mb-3">{account.loanType.loanName}</h5>
                  <hr />
                  <p className="card-text">
                    <div className="d-flex justify-content-between">
                      <p> Bank</p>
                      <p>{account.bank.bankName}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p> Approved Amount</p>
                      <p>₹{account.approvedAmount}</p>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                      <p> Duration</p>
                      <p>{account.durationYears} years</p>
                    </div>
                    </p>
                  <button
                    className="btn btn-dark text-white rounded-pill w-100"
                    onClick={() => handleViewEMIDetails(account.accountId)}
                  >
                    View EMI Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no loan accounts.</p>
      )}
    </div>
  );
};

export default AccountDetails;
