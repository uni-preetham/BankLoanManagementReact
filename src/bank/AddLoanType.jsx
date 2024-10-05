import React, { useState } from 'react';
import axios from 'axios';

function AddLoanType() {
  const [formData, setFormData] = useState({
    loanName: '',
    interestRate: '',
    maxAmount: '',
    durationYears: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/bankloanmanagementsystem/api/loans/add',
        formData,
        { withCredentials: true }  // Ensures session is included
      );
      alert('Loan details added successfully');
    } catch (error) {
      alert('Error adding loan details');
    }
  };

  return (
    <div>
      <h2>Add Loan Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="loanName"
          placeholder="Loan Name"
          value={formData.loanName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate"
          value={formData.interestRate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="maxAmount"
          placeholder="Maximum Amount"
          value={formData.maxAmount}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="durationYears"
          placeholder="Duration (Years)"
          value={formData.durationYears}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Loan</button>
      </form>
    </div>
  );
}

export default AddLoanType;
