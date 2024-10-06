import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoanEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000); // Initial loan amount
  const [interestRate, setInterestRate] = useState(5); // Default interest rate
  const [tenureYears, setTenureYears] = useState(3); // Default tenure in years

  // Calculate EMI using the formula
  const calculateEMI = (principal, rate, tenureMonths) => {
    const monthlyRate = rate / (12 * 100); // Annual rate divided by 12 and percentage
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return emi.toFixed(0);
  };

  const tenureMonths = tenureYears * 12; // Convert years to months
  const emi = calculateEMI(loanAmount, interestRate, tenureMonths); // Calculate EMI

  return (
    <div className="container my-4">
      <div className="card p-4">
        <div className="row">
          <div className="col-md">
            <div className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label htmlFor="loanAmount" className="form-label">
                  Loan Amount:
                </label>
                <input
                  type="text"
                  value={loanAmount}
                  readOnly // Make this field read-only or remove this if you want to make it editable
                />
              </div>
              <input
                type="range"
                className="form-control-range"
                id="loanAmount"
                min="5000"
                max="1000000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>

            <div className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label htmlFor="interestRate" className="form-label">
                  Interest Rate (% P.A.)
                </label>
                <input
                  type="text"
                  value={interestRate}
                  readOnly // Make this field read-only or remove this if you want to make it editable
                />
              </div>
              <input
                type="range"
                className="form-control-range"
                id="interestRate"
                min="1"
                max="20"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>

            <div className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label htmlFor="tenureYears" className="form-label">
                  Tenure (Years)
                </label>
                <input
                  type="text"
                  value={tenureYears}
                  readOnly // Make this field read-only or remove this if you want to make it editable
                />
              </div>
              <input
                type="range"
                className="form-control-range"
                id="tenureYears"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="col-md">
            <h4 className="mb-4">Calculate your monthly EMI</h4>
            <div className="card p-3">
              <p>Estimated EMI</p>
              <h2>₹{emi}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanEmiCalculator;
