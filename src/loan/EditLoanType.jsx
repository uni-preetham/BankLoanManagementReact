import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BankNavbar from "../navbar/BankNavbar";
import amico from "./../pages/Internet on the go-amico.png"; // Assuming you have a similar image

const EditLoanType = () => {
  const { loanTypeId } = useParams(); // Get loan type ID from URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null); // For Formik initial values
  const [error, setError] = useState("");

  // Fetch loan type data by ID
  useEffect(() => {
    const fetchLoanType = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bankloanmanagementsystem/api/loans/${loanTypeId}`,
          {
            withCredentials: true,
          }
        );
        setInitialValues(response.data); // Set initial values for Formik
      } catch (error) {
        setError(error.response?.data?.message || "Loan type not found");
      }
    };

    fetchLoanType();
  }, [loanTypeId]);

  // Validation schema
  const validationSchema = Yup.object({
    loanName: Yup.string().required("Loan name is required"),
    interestRate: Yup.number().required("Interest rate is required").min(0, "Interest rate must be positive"),
    maxAmount: Yup.number().required("Maximum amount is required").min(0, "Maximum amount must be positive"),
    durationYears: Yup.number().required("Duration is required").min(0, "Duration must be positive"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/bankloanmanagementsystem/api/loans/edit/${loanTypeId}`,
        values
      );
      if (response.status === 200) {
        navigate("/bank/viewloans"); // Redirect after successful update
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update loan type");
    }
  };

  // Render the form only if initial values are loaded
  return (
    <>
      <BankNavbar />
      <div className="bg-light">
        <div className="">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row">
            <div className="col-sm-4 bg-white">
              <img src={amico} className="img-fluid my-4" alt="Illustration" />
            </div>
            <div className="col-sm-8 p-5 d-flex flex-column align-items-center ">
            <h2 className="mb-3">Edit Loan Type</h2>
              {initialValues && ( // Ensure initial values are loaded before rendering the form
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className=" w-50">
                      <div className="mb-3 form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="loanName"
                          name="loanName"
                          required
                        />
                        <label htmlFor="loanName">Loan Name</label>
                        <ErrorMessage name="loanName" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3 form-floating">
                        <Field
                          type="number"
                          className="form-control"
                          id="interestRate"
                          name="interestRate"
                          required
                        />
                        <label htmlFor="interestRate">Interest Rate (%)</label>
                        <ErrorMessage name="interestRate" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3 form-floating">
                        <Field
                          type="number"
                          className="form-control"
                          id="maxAmount"
                          name="maxAmount"
                          required
                        />
                        <label htmlFor="maxAmount">Maximum Amount</label>
                        <ErrorMessage name="maxAmount" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3 form-floating">
                        <Field
                          type="number"
                          className="form-control"
                          id="durationYears"
                          name="durationYears"
                          required
                        />
                        <label htmlFor="durationYears">Duration (Years)</label>
                        <ErrorMessage name="durationYears" component="div" className="text-danger" />
                      </div>
                      <button type="submit" className="btn btn-dark text-white rounded-pill w-100" disabled={isSubmitting}>
                        Update Loan Type
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLoanType;
