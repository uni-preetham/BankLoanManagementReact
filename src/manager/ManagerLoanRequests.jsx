import React, { useEffect, useState } from "react";
import axios from "axios";

import ManagerNavbar from "./../navbar/ManagerNavbar";
import Footer from "../pages/Footer";
import { TiTick, TiTimes } from "react-icons/ti";

const ManagerDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/bankloanmanagementsystem/api/manager/loan-requests",
        {
          withCredentials: true,
        }
      );
      setLoanRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const request = loanRequests.find((req) => req.requestId === requestId);
      setSelectedRequest(request); // Set the selected request for details
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error approving loan request:", error);
    }
  };

  const handleConfirmApprove = async () => {
    try {
      await axios.put(
        `http://localhost:8080/bankloanmanagementsystem/api/manager/loan-requests/approve/${selectedRequest.requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      fetchLoanRequests(); // Refresh loan requests after approval
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error approving loan request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:8080/bankloanmanagementsystem/api/manager/loan-requests/reject/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      fetchLoanRequests(); // Refresh loan requests after rejection
    } catch (error) {
      console.error("Error rejecting loan request:", error);
    }
  };

  return (
    <>
      <ManagerNavbar />
      <div className="bg-light">
        <div className="container">
          <h1 className="mb-4">Loan Requests</h1>
          <div className="card shadow-sm mb-5">
            <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User</th>
                <th>Loan Type</th>
                <th>Requested Amount</th>
                {/* <th>Status</th> */}
                {/* <th>Request Date</th> */}
                {/* <th>Document</th> */}
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
                  {/* <td>{request.status}</td> */}
                  {/* <td>{new Date(request.requestDate).toLocaleDateString()}</td> */}
                  {/* <td>
                    <a
                      href={`http://localhost:8080/bankloanmanagementsystem/api/loan-requests/document/${request.requestId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td> */}
                  <td className="d-flex" style={{ gap: "10px" }}>
                    <button
                      className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                      onClick={() => handleApprove(request.requestId)}
                    >
                      <TiTick />
                    </button>
                    <button
                      className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                      onClick={() => handleReject(request.requestId)}
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

          {/* Bootstrap Modal for Loan Request Details */}
          {selectedRequest && (
            <div
              className={`modal fade ${showModal ? "show" : ""}`}
              style={{ display: showModal ? "block" : "none" }}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden={!showModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header d-flex justify-content-between">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Loan Request Details
                    </h5>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">
                        <TiTimes />
                      </span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={selectedRequest.requestId}
                        readOnly
                      />
                      <label className="form-label">Request ID</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={`${selectedRequest.user.firstName} ${selectedRequest.user.lastName}`}
                        readOnly
                      />
                      <label className="form-label">User</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={selectedRequest.loanType.loanName}
                        readOnly
                      />
                      <label className="form-label">Loan Type</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        value={selectedRequest.requestedAmount}
                        readOnly
                      />
                      <label className="form-label">Requested Amount</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={selectedRequest.status}
                        readOnly
                      />
                      <label className="form-label">Status</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={new Date(
                          selectedRequest.requestDate
                        ).toLocaleString()}
                        readOnly
                      />
                      <label className="form-label">Request Date</label>
                    </div>

                    <div className="mb-3">
                      {/* <label className="form-label">Document</label> */}
                      <a
                        href={`http://localhost:8080/bankloanmanagementsystem/api/loan-requests/document/${selectedRequest.requestId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Document
                      </a>
                    </div>
                  </div>

                  <div className="modal-footer">
                    {/* <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-dark text-white rounded-pill"
                      onClick={handleConfirmApprove}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManagerDashboard;
