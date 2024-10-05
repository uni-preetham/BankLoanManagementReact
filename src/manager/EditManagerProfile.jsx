import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../navbar/UserNavbar";

const EditManagerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [managerId, setManagerId] = useState(null); // State to store managerId

  useEffect(() => {
    // Fetch manager from session and set managerId
    axios
      .get("http://localhost:8080/bankloanmanagementsystem/api/manager/details", {
        withCredentials: true,
      })
      .then((response) => {
        const manager = response.data;
        setManagerId(manager.managerId); // Set the managerId from the response
        setFormData({
          firstName: manager.firstName,
          lastName: manager.lastName,
          email: manager.email,
          phone: manager.phone,
        });
      })
      .catch((error) => {
        console.error("Error fetching manager data from session:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (managerId) {
      // Send updated data to the backend
      axios
        .put(
          `http://localhost:8080/bankloanmanagementsystem/api/manager/editmanager/${managerId}`,
          formData,
          { withCredentials: true }
        )
        .then((response) => {
          alert("Profile updated successfully");
          const updatedManager = response.data;
          setFormData({
            firstName: updatedManager.firstName,
            lastName: updatedManager.lastName,
            email: updatedManager.email,
            phone: updatedManager.phone,
          });
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      console.error("Manager ID is not available");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h2>Edit Manager Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditManagerProfile;
