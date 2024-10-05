import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BanksWithLoans = () => {
  const [banks, setBanks] = useState([]);
  const [user, setUser] = useState(null); // State for storing user details
  const [sortType, setSortType] = useState(''); // State to store the selected sorting option
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bankloanmanagementsystem/api/banks/with-loans');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8080/bankloanmanagementsystem/api/user/details", {
          method: "GET",
          credentials: "include", // Ensure session credentials are included
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Store the user details if logged in
        } else {
          throw new Error("Failed to fetch user details");
          // Redirect to timeout or login page if user not logged in
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchBanks();
    fetchUserDetails(); // Fetch user details on component mount
  }, [navigate]);

  const applyForLoan = (loanTypeId) => {
    navigate(`/user/loanrequestform?loanTypeId=${loanTypeId}`);
  };

  // Function to sort loans
  const sortLoans = (a, b) => {
    if (sortType === 'interestRateAsc') {
      return a.interestRate - b.interestRate; // Sort by interest rate (Lowest to Highest)
    } else if (sortType === 'interestRateDesc') {
      return b.interestRate - a.interestRate; // Sort by interest rate (Highest to Lowest)
    } else if (sortType === 'maxAmountAsc') {
      return a.maxAmount - b.maxAmount; // Sort by max amount (Lowest to Highest)
    } else if (sortType === 'maxAmountDesc') {
      return b.maxAmount - a.maxAmount; // Sort by max amount (Highest to Lowest)
    } else {
      return 0; // No sorting if no filter selected
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Available Loans by Banks</h2>

      {/* Dropdown for sorting */}
      <div className="d-flex justify-content-end mb-4">
        <select 
          className="form-select w-auto" 
          value={sortType} 
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="" disabled>Sort by</option>
          <option value="interestRateAsc">Interest Rate (Low to High)</option>
          <option value="interestRateDesc">Interest Rate (High to Low)</option>
          <option value="maxAmountAsc">Max Amount (Low to High)</option>
          <option value="maxAmountDesc">Max Amount (High to Low)</option>
        </select>
      </div>

      {banks.map((bank) => (
        <div key={bank.bankId} className="mb-5">
          <h3>{bank.bankName} - {bank.branchAddress}</h3>
          <p>Contact: {bank.contactNumber}</p>

          <div className="row">
            {bank.loanTypes
              .sort(sortLoans) // Apply sorting to loanTypes
              .map((loan) => (
                <div key={loan.loanTypeId} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{loan.loanName}</h5>
                      <p className="card-text">
                        Interest Rate: {loan.interestRate}%<br />
                        Maximum Amount: ₹{loan.maxAmount}<br />
                        Duration: {loan.durationYears} years
                      </p>

                      {/* Conditionally render the "Apply Now" button if the user is logged in */}
                      {user ? (
                        <button 
                          className="btn btn-dark fw-semibold text-white rounded-pill w-100" 
                          onClick={() => applyForLoan(loan.loanTypeId)}
                        >
                          Apply Now
                        </button>
                      ) : (
                        <p className="text-danger"></p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BanksWithLoans;
