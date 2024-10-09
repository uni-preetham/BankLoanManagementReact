import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import loanImage from './../pages/Internet on the go-amico.png'; // Adjust the import to your image path
import BankNavbar from '../navbar/BankNavbar';

const AddLoanType = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    loanName: Yup.string().required('Loan name is required').max(50, 'Maximum 50 characters only'),
    interestRate: Yup.number().required('Interest rate is required').min(0, 'Interest rate must be positive').max(20, 'Maximum 2 numbers only'),
    maxAmount: Yup.number().required('Maximum amount is required').min(0, 'Maximum amount must be positive').max(999999999, 'Please enter lesser amount'),
    durationYears: Yup.number().required('Duration is required').min(0, 'Duration must be positive').max(30, 'Maximum 30 years only'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post(
        'http://localhost:8080/bankloanmanagementsystem/api/loans/add',
        values,
        { withCredentials: true }
      );
      alert('Loan details added successfully');
    } catch (error) {
      setErrors({ submit: 'Error adding loan details' });
    } finally {
      setSubmitting(false);
    }
  };

  return (<>
  <BankNavbar />
  <div className="bg-light">
    <div className="">
      <div className="row">
        <div className="col-md-4 bg-white py-5">
          <img src={loanImage} alt="Loan" className="img-fluid" />
        </div>
        <div className="col-md-8 d-flex flex-column align-items-center py-5">
      <h2 className='pb-3'>Add Loan Details</h2>
          <Formik
            initialValues={{
              loanName: '',
              interestRate: '',
              maxAmount: '',
              durationYears: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className='w-50'>
                <div className="mb-3 form-floating">
                  <Field
                    type="text"
                    className="form-control"
                    id="loanName"
                    name="loanName"
                    placeholder=""
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
                    placeholder=""
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
                    placeholder=""
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
                    placeholder=""
                    required
                  />
                  <label htmlFor="durationYears">Duration (Years)</label>
                  <ErrorMessage name="durationYears" component="div" className="text-danger" />
                </div>
                {errors.submit && <div className="text-danger">{errors.submit}</div>}
                <button type="submit" className="btn btn-dark rounded-pill w-100 text-white " disabled={isSubmitting}>
                  Add Loan
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default AddLoanType;
