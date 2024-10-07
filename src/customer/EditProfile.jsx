import React, { useState, useEffect } from "react";
import axios from "axios";
import loginImg from "./../pages/Forms-cuate.png";
import UserNavbar from "../navbar/UserNavbar";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    salary: 0,
    creditScore: 0,
    address: "",
  });

  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [addressData, setAddressData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [occupationData, setOccupationData] = useState({
    occupationType: "",
    occupationName: "",
    companyName: "",
    salary: 0,
  });

  useEffect(() => {
    // Fetch user profile data
    axios
      .get("http://localhost:8080/bankloanmanagementsystem/api/user/details", {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        setUserId(user.userId);
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          salary: user.salary,
          creditScore: user.creditScore,
          address: user.address,
        });

        // Fetch address and occupation details
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
        setAddressData(response.data);
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
        setOccupationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching occupation data:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleOccupationChange = (e) => {
    const { name, value } = e.target;
    setOccupationData({ ...occupationData, [name]: value });
  };

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
      <div className="bg-light">
        <div className="container pt-5">
          <h2>Edit Profile</h2>
          <div className="row">
            <div className="col-sm">
              <img src={loginImg} alt="" style={{ width: "450px" }} />
            </div>
            <div className="col-sm">
              <ul className="nav nav-tabs mb-3">
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
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      id="firstName"
                      placeholder="First Name"
                    />
                    <label htmlFor="firstName">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      id="lastName"
                      placeholder="Last Name"
                    />
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      id="phone"
                      placeholder="Phone"
                    />
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      name="creditScore"
                      value={formData.creditScore}
                      onChange={handleChange}
                      id="creditScore"
                      placeholder="Credit Score"
                    />
                    <label htmlFor="creditScore">Credit Score</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Profile
                  </button>
                </form>
              )}

              {activeTab === "address" && (
                <form onSubmit={handleSubmitAddress}>
                  {/* Address form fields */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="addressLine1"
                      value={addressData.addressLine1}
                      onChange={handleAddressChange}
                      id="addressLine1"
                      placeholder="Address Line 1"
                    />
                    <label htmlFor="addressLine1">Address Line 1</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="addressLine2"
                      value={addressData.addressLine2}
                      onChange={handleAddressChange}
                      id="addressLine2"
                      placeholder="Address Line 2"
                    />
                    <label htmlFor="addressLine2">Address Line 2</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={addressData.city}
                      onChange={handleAddressChange}
                      id="city"
                      placeholder="City"
                    />
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={addressData.state}
                      onChange={handleAddressChange}
                      id="state"
                      placeholder="State"
                    />
                    <label htmlFor="state">State</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={addressData.zipCode}
                      onChange={handleAddressChange}
                      id="zipCode"
                      placeholder="Zip Code"
                    />
                    <label htmlFor="zipCode">Zip Code</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Address
                  </button>
                </form>
              )}

              {activeTab === "occupation" && (
                <form onSubmit={handleSubmitOccupation}>
                  {/* Occupation form fields */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="occupationType"
                      value={occupationData.occupationType}
                      onChange={handleOccupationChange}
                      id="occupationType"
                      placeholder="Occupation Type"
                    />
                    <label htmlFor="occupationType">Occupation Type</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="occupationName"
                      value={occupationData.occupationName}
                      onChange={handleOccupationChange}
                      id="occupationName"
                      placeholder="Occupation Name"
                    />
                    <label htmlFor="occupationName">Occupation Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      value={occupationData.companyName}
                      onChange={handleOccupationChange}
                      id="companyName"
                      placeholder="Company Name"
                    />
                    <label htmlFor="companyName">Company Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      name="salary"
                      value={occupationData.salary}
                      onChange={handleOccupationChange}
                      id="salary"
                      placeholder="Salary"
                    />
                    <label htmlFor="salary">Salary</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Occupation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
