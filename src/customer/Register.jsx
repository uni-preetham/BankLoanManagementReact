import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import amico from "./Mobile login-amico.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      salary: "",
      creditScore: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .max(50, "Email must be at most 50 characters")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[com]{3}$/, "Email must contain one '@' and end with '.com'")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password must contain at least one number and one special character")
        .required("Password is required"),
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be at most 50 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 1 characters")
        .max(50, "Last name must be at most 50 characters")
        .required("Last name is required"),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Phone number must start with 6, 7, 8, or 9 and contain 10 digits")
        .required("Phone number is required"),
      salary: Yup.number()
        .positive("Salary must be positive")
        .required("Salary is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          "http://localhost:8080/bankloanmanagementsystem/api/register/registeruser",
          values
        );
        formik.resetForm();
         // Store success message in local storage and navigate to login page
         localStorage.setItem("registrationSuccess", "User registered successfully");
         navigate("/login");
        // formik.setStatus({ success: "Registration successful!" });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          formik.setStatus({ error: error.response.data });
        } else {
          formik.setStatus({ error: "There was an error during registration." });
        }
      }
    },
  });

  return (
    <>
      <Navbar />
      <section>
        <div className="">
          <div className="row">
            <div className="col-sm-4">
              <img src={amico} alt="" className="my-5"/>
            </div>
            <div className="col-sm-8 bg-light d-flex flex-column align-items-center">
              <h1 className="mt-3 fw-bold">Create an account</h1>
              {/* Display success or error message */}
              {formik.status && (
                <span className={`mt-2 ${formik.status.success ? 'text-success' : 'text-danger'}`}>
                  {formik.status.success || formik.status.error}
                </span>
                // <span className={`mt-2 ${formik.status.success ? 'text-success' : 'text-danger'}`}>
                //   {formik.status.success || formik.status.error}
                // </span>
              )}
              <form onSubmit={formik.handleSubmit} className="mt-4 w-50">
                <div className="form-floating mb-2">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="floatingEmail"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                  />
                  <label htmlFor="floatingEmail">Email<span className="text-danger">*</span></label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                  />
                  <label htmlFor="floatingPassword">Password<span className="text-danger">*</span></label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="d-flex">
                  <div className="form-floating mb-2 me-2">
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                      id="floatingFirstName"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      required
                    />
                    <label htmlFor="floatingFirstName">First Name<span className="text-danger">*</span></label>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="invalid-feedback">{formik.errors.firstName}</div>
                    ) : null}
                  </div>

                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                      id="floatingLastName"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      required
                    />
                    <label htmlFor="floatingLastName">Last Name</label>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="invalid-feedback">{formik.errors.lastName}</div>
                    ) : null}
                  </div>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="text"
                    name="phone"
                    className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                    id="floatingPhone"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    required
                  />
                  <label htmlFor="floatingPhone">Phone<span className="text-danger">*</span></label>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="invalid-feedback">{formik.errors.phone}</div>
                  ) : null}
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="number"
                    name="salary"
                    className={`form-control ${formik.touched.salary && formik.errors.salary ? 'is-invalid' : ''}`}
                    id="floatingSalary"
                    placeholder="Annual Income"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.salary}
                    required
                  />
                  <label htmlFor="floatingSalary">Annual Income<span className="text-danger">*</span></label>
                  {formik.touched.salary && formik.errors.salary ? (
                    <div className="invalid-feedback">{formik.errors.salary}</div>
                  ) : null}
                </div>

                

                <button type="submit" className="btn btn-dark text-white rounded-pill mt-2 w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
