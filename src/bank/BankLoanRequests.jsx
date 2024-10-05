import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BankLoanRequests = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLoanRequests();
            
          
    }, []);

    const fetchLoanRequests =  () => {
        axios.get("http://localhost:8080/bankloanmanagementsystem/api/banks/verified-loan-requests", {
            withCredentials: true, // Set credentials to include cookies
          })
            .then((response) => {
              setLoanRequests(response.data); // Set the manager data
            })
            .catch((error) => {
              console.error("Error fetching manager details:", error);
            });
    }

    const handleApproval = async (loanRequestId, status) => {
        try {
            await axios.put(`http://localhost:8080/bankloanmanagementsystem/api/banks/approve/${loanRequestId}`, null, {
                params: { status }
            });
            // Optionally, refresh the loan requests
            const updatedRequests = loanRequests.filter(request => request.requestId !== loanRequestId);
            setLoanRequests(updatedRequests);
            fetchLoanRequests();
        } catch (err) {
            setError('Error approving loan request');
        }
    };

    return (
        <div>
            <h1>Loan Requests</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
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
                    {loanRequests.map(request => (
                        <tr key={request.requestId}>
                            <td>{request.requestId}</td>
                            <td>{request.user.firstName} {request.user.lastName}</td>
                            <td>{request.loanType.loanName}</td>
                            <td>{request.requestedAmount}</td>
                            <td>{request.status}</td>
                            <td>
                                <button onClick={() => handleApproval(request.requestId, 'Approved')}>Approve</button>
                                <button onClick={() => handleApproval(request.requestId, 'Rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BankLoanRequests;
