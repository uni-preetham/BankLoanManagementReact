import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../navbar/UserNavbar';
import amico from './../pages/Internet on the go-amico.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChangePassword = () => {
  const { userId } = useParams(); // Retrieve userId from URL
  const navigate = useNavigate(); // Hook for navigation

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must not exceed 20 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
      .required('Confirm password is required'),
  });

  const handleChangePassword = (values, { setSubmitting }) => {
    // Prepare the request payload
    const payload = {
      userId: userId,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    // Send the password change request to the backend
    axios
      .post(`http://localhost:8080/bankloanmanagementsystem/api/user/changepassword`, payload, { withCredentials: true })
      .then((response) => {
        alert("Password changed successfully!");

        // Logout after changing password
        return axios.post(`http://localhost:8080/bankloanmanagementsystem/api/user/logout`, {}, { withCredentials: true });
      })
      .then(() => {
        // Redirect to login page after logging out
        navigate('/login'); // Adjust the route to your actual login path
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        alert(error.response.data || "An error occurred while changing the password.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <UserNavbar />
      <div className='bg-light'>
        <div className="row">
          <div className="col-sm-4 bg-white">
            <img src={amico} alt="" style={{ width: "450px" }} className='py-4' />
          </div>
          <div className="col-sm-8 d-flex flex-column align-items-center pt-5">
            <h2 className='pb-3'>Change Password</h2>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleChangePassword}
            >
              {({ isSubmitting }) => (
                <Form className='w-50'>
                  <div className="form-floating mb-3">
                    <Field
                      type="password"
                      className="form-control"
                      placeholder="Current Password"
                      name="currentPassword"
                    />
                    <label>Current Password</label>
                    <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                  </div>
                  <div className="form-floating mb-3">
                    <Field
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      name="newPassword"
                    />
                    <label>New Password</label>
                    <ErrorMessage name="newPassword" component="div" className="text-danger" />
                  </div>
                  <div className="form-floating mb-3">
                    <Field
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      name="confirmPassword"
                    />
                    <label>Confirm New Password</label>
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-dark rounded-pill mb-5" disabled={isSubmitting}>
                    Change Password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
