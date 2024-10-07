import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiTrash } from "react-icons/ti";
import BankNavbar from "../navbar/BankNavbar";

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/bankloanmanagementsystem/api/manager/getallmanagers",
        { withCredentials: true }
      );
      setManagers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch managers.");
      setLoading(false);
    }
  };

  const disableManager = async (managerId) => {
    try {
      await axios.delete(
        `http://localhost:8080/bankloanmanagementsystem/api/manager/deletemanager/${managerId}`,
        { withCredentials: true }
      );
      // Remove the manager from the list after successful deletion
      setManagers(
        managers.filter((manager) => manager.managerId !== managerId)
      );
    } catch (error) {
      setError("Failed to delete manager.");
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <BankNavbar />
      <div className="bg-light">
        <div className="container py-5">
          <h2 className="mb-4">All Managers</h2>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {managers.length === 0 ? (
              <div className="alert alert-info text-center">
                No managers found.
              </div>
            ) : (
              <div className="table-responsive">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th>Manager ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managers.map((manager) => (
                          <tr key={manager.managerId}>
                            <td>{manager.managerId}</td>
                            <td>{manager.firstName}</td>
                            <td>{manager.lastName}</td>
                            <td>{manager.email}</td>
                            <td>
                              <button
                                className="btn btn-light border border-dark rounded-pill d-flex justify-content-center align-items-center"
                                onClick={() =>
                                  disableManager(manager.managerId)
                                }
                              >
                                <TiTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerList;
