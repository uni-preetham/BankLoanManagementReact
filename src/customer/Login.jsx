import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use for navigation
import Navbar from "../navbar/Navbar";
import amico from "./Mobile login-amico.png";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [notification, setNotification] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // React Router hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/bankloanmanagementsystem/api/login/loginuser",
        formData,
        { withCredentials: true }
      );
      const redirectUrl = response.data;

      // Redirect to the URL based on the role
      navigate(redirectUrl);
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  useEffect(() => {
    // Check for registration success message in local storage
    const successMessage = localStorage.getItem("registrationSuccess");
    if (successMessage) {
      setNotification(successMessage);
      localStorage.removeItem("registrationSuccess"); // Remove message after displaying

      // Set a timeout to clear the notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);

      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="">
          <div className="row">
            <div className="col-sm-4">
              <img src={amico} className="my-5" alt="" />
            </div>
            <div className="col-sm-8 bg-light d-flex flex-column align-items-center">
              {notification && <div className="mt-3 text-success">{notification}</div>}
              {/* Display error message if login fails */}
              {errorMessage && (
                <span className="mt-3 text-danger mt-2">{errorMessage}</span>
              )}
              <h1 className="mt-3 fw-bold">Sign in</h1>
              <form onSubmit={handleSubmit} className="mt-4 w-50">
                <div className="mb-3">
                  <label
                    htmlFor="floatingEmail"
                    className="fw-semibold text-dark"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label
                      htmlFor="floatingPassword"
                      className="fw-semibold text-dark"
                    >
                      Password
                    </label>
                    <small>
                      <a href="/forgotpassword" className="text-dark">
                        Forgot password?
                      </a>
                    </small>
                  </div>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between password and text
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary d-flex align-items-center "
                      onClick={togglePasswordVisibility}
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark text-white rounded-pill mt-2 w-100"
                >
                  Login
                </button>
              </form>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <a href="/registeruser" className="text-dark">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
