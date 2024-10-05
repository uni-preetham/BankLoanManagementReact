import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bankloanmanagementsystem/api/manager/loan-requests', {
        withCredentials: true,
      });
      setLoanRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching loan requests:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const request = loanRequests.find(req => req.requestId === requestId);
      setSelectedRequest(request); // Set the selected request for details
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error('Error approving loan request:', error);
    }
  };

  const handleConfirmApprove = async () => {
    try {
      await axios.put(`http://localhost:8080/bankloanmanagementsystem/api/manager/loan-requests/approve/${selectedRequest.requestId}`, {}, {
        withCredentials: true,
      });
      fetchLoanRequests(); // Refresh loan requests after approval
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error approving loan request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(`http://localhost:8080/bankloanmanagementsystem/api/manager/loan-requests/reject/${requestId}`, {}, {
        withCredentials: true,
      });
      fetchLoanRequests(); // Refresh loan requests after rejection
    } catch (error) {
      console.error('Error rejecting loan request:', error);
    }
  };

  return (
    <div>
      <h1>Loan Requests</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User</th>
            <th>Loan Type</th>
            <th>Requested Amount</th>
            <th>Status</th>
            <th>Request Date</th>
            <th>Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loanRequests.map((request) => (
            <tr key={request.requestId}>
              <td>{request.requestId}</td>
              <td>{request.user.firstName} {request.user.lastName}</td>
              <td>{request.loanType.loanName}</td>
              <td>{request.requestedAmount}</td>
              <td>{request.status}</td>
              <td>{new Date(request.requestDate).toLocaleString()}</td>
              <td>
                <a href={`http://localhost:8080/bankloanmanagementsystem/api/loan-requests/document/${request.requestId}`} target="_blank" rel="noopener noreferrer">
                  Download Document
                </a>
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleApprove(request.requestId)}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleReject(request.requestId)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal for Loan Request Details */}
      {selectedRequest && (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Loan Request Details</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Request ID</label>
                  <input type="text" className="form-control" value={selectedRequest.requestId} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">User</label>
                  <input type="text" className="form-control" value={`${selectedRequest.user.firstName} ${selectedRequest.user.lastName}`} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Loan Type</label>
                  <input type="text" className="form-control" value={selectedRequest.loanType.loanName} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Requested Amount</label>
                  <input type="number" className="form-control" value={selectedRequest.requestedAmount} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input type="text" className="form-control" value={selectedRequest.status} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Request Date</label>
                  <input type="text" className="form-control" value={new Date(selectedRequest.requestDate).toLocaleString()} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Document</label>
                  <a href={`http://localhost:8080/bankloanmanagementsystem/api/loan-requests/document/${selectedRequest.requestId}`} target="_blank" rel="noopener noreferrer">Download Document</a>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleConfirmApprove}>Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
