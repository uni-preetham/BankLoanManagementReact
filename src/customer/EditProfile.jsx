import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../navbar/UserNavbar";

const EditProfile = () => {
  // State for profile form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    salary: 0,
    creditScore: 0,
    address: "",
  });

  // State for userId
  const [userId, setUserId] = useState(null);

  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  // State for address form fields
  const [addressData, setAddressData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // State for occupation form fields
  const [occupationData, setOccupationData] = useState({
    occupationType: "",
    occupationName: "",
    companyName: "",
    salary: 0,
  });

  // Fetch user profile, address, and occupation details
  useEffect(() => {
    axios
      .get("http://localhost:8080/bankloanmanagementsystem/api/user/details", {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        setUserId(user.userId);

        // Populate profile form data
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
          salary: user.salary || 0,
          creditScore: user.creditScore || 0,
          address: user.address || "",
        });

        // Fetch address and occupation data
        fetchAddress(user.userId);
        fetchOccupation(user.userId);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Fetch address details
  const fetchAddress = (userId) => {
    axios
      .get(
        `http://localhost:8080/bankloanmanagementsystem/api/address/${userId}`,
        { withCredentials: true }
      )
      .then((response) => {
        setAddressData({
          addressLine1: response.data.addressLine1 || "",
          addressLine2: response.data.addressLine2 || "",
          city: response.data.city || "",
          state: response.data.state || "",
          zipCode: response.data.zipCode || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching address data:", error);
      });
  };

  // Fetch occupation details
  const fetchOccupation = (userId) => {
    axios
      .get(
        `http://localhost:8080/bankloanmanagementsystem/api/occupation/${userId}`,
        { withCredentials: true }
      )
      .then((response) => {
        setOccupationData({
          occupationType: response.data.occupationType || "",
          occupationName: response.data.occupationName || "",
          companyName: response.data.companyName || "",
          salary: response.data.salary || 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching occupation data:", error);
      });
  };

  // Handle profile form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle address form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  // Handle occupation form changes
  const handleOccupationChange = (e) => {
    const { name, value } = e.target;
    setOccupationData({ ...occupationData, [name]: value });
  };

  // Submit profile data
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    if (userId) {
      axios
        .put(
          `http://localhost:8080/bankloanmanagementsystem/api/user/edit/${userId}`,
          formData,
          { withCredentials: true }
        )
        .then((response) => {
          alert("Profile updated successfully");
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  // Submit address data
  const handleSubmitAddress = (e) => {
    e.preventDefault();
    if (userId) {
      axios
        .post(
          `http://localhost:8080/bankloanmanagementsystem/api/address/add/${userId}`,
          addressData,
          { withCredentials: true }
        )
        .then((response) => {
          alert("Address added/updated successfully");
          setAddressData(response.data);
        })
        .catch((error) => {
          console.error("Error adding address:", error);
        });
    }
  };

  // Submit occupation data
  const handleSubmitOccupation = (e) => {
    e.preventDefault();
    if (userId) {
      axios
        .post(
          `http://localhost:8080/bankloanmanagementsystem/api/occupation/add/${userId}`,
          occupationData,
          { withCredentials: true }
        )
        .then((response) => {
          alert("Occupation added/updated successfully");
          setOccupationData(response.data);
        })
        .catch((error) => {
          console.error("Error adding occupation:", error);
        });
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h2>Edit Profile</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "address" ? "active" : ""}`}
              onClick={() => setActiveTab("address")}
            >
              Address
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "occupation" ? "active" : ""}`}
              onClick={() => setActiveTab("occupation")}
            >
              Occupation
            </a>
          </li>
        </ul>

        {activeTab === "profile" && (
          <form onSubmit={handleSubmitProfile}>
            {/* Profile form fields */}
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
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Credit Score</label>
              <input
                type="number"
                className="form-control"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </form>
        )}

        {activeTab === "address" && (
          <form onSubmit={handleSubmitAddress}>
            {/* Address form fields */}
            <div className="form-group">
              <label>Address Line 1</label>
              <input
                type="text"
                className="form-control"
                name="addressLine1"
                value={addressData.addressLine1}
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input
                type="text"
                className="form-control"
                name="addressLine2"
                value={addressData.addressLine2}
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={addressData.city}
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={addressData.state}
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={addressData.zipCode}
                onChange={handleAddressChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Address</button>
          </form>
        )}

        {activeTab === "occupation" && (
          <form onSubmit={handleSubmitOccupation}>
            {/* Occupation form fields */}
            <div className="form-group">
              <label>Occupation Type</label>
              <input
                type="text"
                className="form-control"
                name="occupationType"
                value={occupationData.occupationType}
                onChange={handleOccupationChange}
              />
            </div>
            <div className="form-group">
              <label>Occupation Name</label>
              <input
                type="text"
                className="form-control"
                name="occupationName"
                value={occupationData.occupationName}
                onChange={handleOccupationChange}
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={occupationData.companyName}
                onChange={handleOccupationChange}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                className="form-control"
                name="salary"
                value={occupationData.salary}
                onChange={handleOccupationChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Occupation</button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProfile;
