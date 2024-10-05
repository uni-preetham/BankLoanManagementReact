import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoanRequestForm = () => {
  const [user, setUser] = useState(null);
  const [loanTypeDetails, setLoanTypeDetails] = useState(null);
  const [document, setDocument] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("loanDetails");
  const [showModal, setShowModal] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState("");
  const [searchParams] = useSearchParams();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (message) => {
    setEligibilityMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/bankloanmanagementsystem/api/user/details",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.creditScore < 700 || data.salary < 50000) {
            handleShowModal(
              "You are not eligible to apply for a loan because your credit score is less than 700 or your salary is less than ₹50,000."
            );
          }

          setUser(data);
          // Update Formik values with user data
          formik.setValues({
            ...formik.values,
            userId: data.userId,
            addressLine1: data.address?.addressLine1 || "",
            addressLine2: data.address?.addressLine2 || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || "",
            occupationType: data.occupation?.occupationType || "Salaried",
            occupationName: data.occupation?.occupationName || "",
            companyName: data.occupation?.companyName || "",
            salary: data.occupation?.salary || "",
          });
        } else {
          throw new Error("Failed to fetch user details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLoanTypeDetails = async (loanTypeId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bankloanmanagementsystem/api/loans/${loanTypeId}`
        );
        setLoanTypeDetails(response.data);
        formik.setFieldValue("loanTypeId", response.data.loanTypeId);
      } catch (error) {
        console.error("Error fetching loan type details:", error);
      }
    };

    const loanTypeId = searchParams.get("loanTypeId");
    if (loanTypeId) {
      fetchLoanTypeDetails(loanTypeId);
    }

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const validationSchema = Yup.object().shape({
    requestedAmount: Yup.number()
      .required("Requested amount is required")
      .test(
        "max-amount",
        "Requested amount exceeds the maximum allowed amount.",
        function (value) {
          const { maxAmount } = loanTypeDetails || {};
          if (!maxAmount) {
            return true; // Skip validation if maxAmount is not available
          }
          return value <= maxAmount;
        }
      ),
    loanTerm: Yup.number()
      .required("Loan term is required")
      .min(1, "Loan term must be at least 1 year")
      .max(30, "Loan term cannot exceed 30 years"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    occupationName: Yup.string().required("Occupation Name is required"),
    companyName: Yup.string().required("Company Name is required"),
    salary: Yup.number().required("Salary is required"),
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
      loanTypeId: "",
      requestedAmount: "",
      loanTerm: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      occupationType: "Salaried",
      occupationName: "",
      companyName: "",
      salary: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (
        loanTypeDetails &&
        parseFloat(values.requestedAmount) > loanTypeDetails.maxAmount
      ) {
        setMessage(
          `Requested amount exceeds the maximum allowed amount of ₹${loanTypeDetails.maxAmount}.`
        );
        return;
      }
      const formDataObj = new FormData();
      Object.keys(values).forEach((key) => {
        formDataObj.append(key, values[key]);
      });
      formDataObj.append("document", document);

      try {
        const response = await axios.post(
          "http://localhost:8080/bankloanmanagementsystem/api/loan-requests/apply",
          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(response.data);
      } catch (error) {
        console.error("Error submitting loan request:", error);
        setMessage("Error submitting loan request. Please try again.");
      }
    },
  });

  const handleFileChange = (e) => setDocument(e.target.files[0]);

  if (!user || !loanTypeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Apply for Loan</h2>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      {/* Modal for eligibility message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eligibility Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{eligibilityMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Navigation tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "loanDetails" ? "active" : ""
            }`}
            onClick={() => setActiveTab("loanDetails")}
            href="#"
          >
            Loan Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "personalDetails" ? "active" : ""
            }`}
            onClick={() => setActiveTab("personalDetails")}
            href="#"
          >
            Personal Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "occupationDetails" ? "active" : ""
            }`}
            onClick={() => setActiveTab("occupationDetails")}
            href="#"
          >
            Occupation Details
          </a>
        </li>
      </ul>

      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="mt-4"
      >
        {activeTab === "loanDetails" && (
          <>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="userId"
                name="userId"
                value={formik.values.userId}
                readOnly
                required
              />
              <label htmlFor="userId">User ID</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="loanTypeId"
                name="loanTypeId"
                value={loanTypeDetails.loanTypeId}
                readOnly
                required
              />
              <label htmlFor="loanTypeId">
                Loan Type: {loanTypeDetails.loanName}
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className={`form-control ${
                  formik.touched.requestedAmount &&
                  formik.errors.requestedAmount
                    ? "is-invalid"
                    : ""
                }`}
                id="requestedAmount"
                name="requestedAmount"
                value={formik.values.requestedAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Requested Amount"
                required
              />
              <label htmlFor="requestedAmount">
                Requested Amount (Max: ₹{loanTypeDetails.maxAmount})
              </label>
              {formik.touched.requestedAmount &&
              formik.errors.requestedAmount ? (
                <div className="invalid-feedback">
                  {formik.errors.requestedAmount}
                </div>
              ) : null}
            </div>

            <div className="form-floating">
              <input
                type="number"
                id="loanTerm"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.loanTerm}
                onBlur={formik.handleBlur}
                placeholder="Loan Term"
              />
              <label htmlFor="loanTerm">Loan Term (Max {loanTypeDetails.durationYears} years)</label>
              {formik.touched.loanTerm && formik.errors.loanTerm && (
                <div className="text-danger">{formik.errors.loanTerm}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="document" className="form-label">
                Upload Document
              </label>
              <input
                className="form-control"
                type="file"
                id="document"
                name="document"
                onChange={handleFileChange}
                required
              />
            </div>
          </>
        )}

        {activeTab === "personalDetails" && (
          <>
            <div className="form-floating mb-3">
      <input
        type="text"
        className={`form-control ${
          formik.touched.addressLine1 && formik.errors.addressLine1
            ? "is-invalid"
            : ""
        }`}
        id="addressLine1"
        name="addressLine1"
        value={formik.values.addressLine1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Address Line 1"
        required
        disabled
      />
      <label htmlFor="addressLine1">Address Line 1</label>
      {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
        <div className="invalid-feedback">
          {formik.errors.addressLine1}
        </div>
      ) : null}
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        id="addressLine2"
        name="addressLine2"
        value={formik.values.addressLine2}
        onChange={formik.handleChange}
        placeholder="Address Line 2"
        disabled
      />
      <label htmlFor="addressLine2">Address Line 2</label>
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className={`form-control ${
          formik.touched.city && formik.errors.city ? "is-invalid" : ""
        }`}
        id="city"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="City"
        required
        disabled
      />
      <label htmlFor="city">City</label>
      {formik.touched.city && formik.errors.city ? (
        <div className="invalid-feedback">{formik.errors.city}</div>
      ) : null}
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className={`form-control ${
          formik.touched.state && formik.errors.state
            ? "is-invalid"
            : ""
        }`}
        id="state"
        name="state"
        value={formik.values.state}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="State"
        required
        disabled
      />
      <label htmlFor="state">State</label>
      {formik.touched.state && formik.errors.state ? (
        <div className="invalid-feedback">{formik.errors.state}</div>
      ) : null}
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className={`form-control ${
          formik.touched.zipCode && formik.errors.zipCode
            ? "is-invalid"
            : ""
        }`}
        id="zipCode"
        name="zipCode"
        value={formik.values.zipCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Zip Code"
        required
        disabled
      />
      <label htmlFor="zipCode">Zip Code</label>
      {formik.touched.zipCode && formik.errors.zipCode ? (
        <div className="invalid-feedback">{formik.errors.zipCode}</div>
      ) : null}
    </div>
  </>
)}

{activeTab === "occupationDetails" && (
  <>
    <div className="form-floating mb-3">
      <select
        className={`form-select ${
          formik.touched.occupationType && formik.errors.occupationType
            ? "is-invalid"
            : ""
        }`}
        id="occupationType"
        name="occupationType"
        value={formik.values.occupationType}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        disabled
      >
        <option value="Salaried">Salaried</option>
        <option value="Self-Employed">Self-Employed</option>
      </select>
      <label htmlFor="occupationType">Occupation Type</label>
      {formik.touched.occupationType && formik.errors.occupationType ? (
        <div className="invalid-feedback">
          {formik.errors.occupationType}
        </div>
      ) : null}
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className={`form-control ${
          formik.touched.occupationName && formik.errors.occupationName
            ? "is-invalid"
            : ""
        }`}
        id="occupationName"
        name="occupationName"
        value={formik.values.occupationName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Occupation Name"
        required
        disabled
      />
      <label htmlFor="occupationName">Occupation Name</label>
      {formik.touched.occupationName && formik.errors.occupationName ? (
        <div className="invalid-feedback">
          {formik.errors.occupationName}
        </div>
      ) : null}
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className={`form-control ${
          formik.touched.companyName && formik.errors.companyName
            ? "is-invalid"
            : ""
        }`}
        id="companyName"
        name="companyName"
        value={formik.values.companyName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Company Name"
        required
        disabled
      />
      <label htmlFor="companyName">Company Name</label>
      {formik.touched.companyName && formik.errors.companyName ? (
        <div className="invalid-feedback">
          {formik.errors.companyName}
        </div>
      ) : null}
    </div>

    <div className="form-floating mb-3">
      <input
        type="number"
        className={`form-control ${
          formik.touched.salary && formik.errors.salary
            ? "is-invalid"
            : ""
        }`}
        id="salary"
        name="salary"
        value={formik.values.salary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Salary"
        required
        disabled
      />
      <label htmlFor="salary">Salary</label>
      {formik.touched.salary && formik.errors.salary ? (
        <div className="invalid-feedback">{formik.errors.salary}</div>
      ) : null}
    </div>
            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit Loan Request
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoanRequestForm;
