import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import BankNavbar from '../navbar/BankNavbar';
import amico from './../pages/Internet on the go-amico.png'

function RegisterManager() {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().optional(), // Phone is optional
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post(
        'http://localhost:8080/bankloanmanagementsystem/api/register/registermanager',
        values,
        { withCredentials: true }
      );
      alert('Manager registered successfully');
    } catch (error) {
      setErrors({ submit: 'Error registering manager' });
    } finally {
      setSubmitting(false);
    }
  };

  return (<>

  <BankNavbar />
  <div className="bg-light">
    
    <div className='row'>
      <div className="col-sm-4 bg-white">
      <img src={amico} className="img-fluid my-4" alt="Illustration" />
      </div>
      <div className="col-sm-8 d-flex flex-column align-items-center">
      <h2 
      className="pt-5 text-center">Register Manager</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form
          className="px-5 pt-3 ">
            <div className="d-flex" style={{gap: "10px"}}>
            <div className="mb-3 form-floating">
              <Field
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                required
              />
              <label htmlFor="firstName">First Name</label>
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-floating">
              <Field
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                required
              />
              <label htmlFor="lastName">Last Name</label>
              <ErrorMessage name="lastName" component="div" className="text-danger" />
            </div>
            </div>
            <div className="mb-3 form-floating">
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
              <label htmlFor="email">Email</label>
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-floating">
              <Field
                type="text"
                className="form-control"
                id="phone"
                name="phone"
              />
              <label htmlFor="phone">Phone</label>
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-floating">
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
              <label htmlFor="password">Password</label>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            {errors.submit && <div className="text-danger">{errors.submit}</div>}
            <button type="submit" className="btn btn-dark text-white w-100 rounded-pill" disabled={isSubmitting}>
              Register Manager
            </button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  </div>
  </>
  );
}

export default RegisterManager;
