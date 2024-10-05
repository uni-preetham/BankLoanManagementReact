import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bankloanmanagementsystem/api/account/accountdetails', {
          withCredentials: true // Include credentials for session management
        });
        setAccounts(response.data);
      } catch (err) {
        setError("Error fetching account details");
        console.error(err);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Your Loan Accounts</h2>
      {error && <p>{error}</p>}
      {accounts.length > 0 ? (
        <div className="row">
          {accounts.map(account => (
            <div key={account.accountId} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{account.loanType.loanName}</h5>
                  <p className="card-text">
                    Bank: {account.bank.bankName}<br />
                    Approved Amount: ₹{account.approvedAmount}<br />
                    Interest Rate: {account.interestRate}%<br />
                    Duration: {account.durationYears} years<br />
                    Approval Date: {new Date(account.approvalDate).toLocaleDateString()}
                  </p>
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
