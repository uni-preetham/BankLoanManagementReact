import React from "react";
import Navbar from "../navbar/Navbar";
import hero from "./hero-img.png";
import img2 from "./Internet on the go-amico.png";
import img3 from "./eating a variety of foods-bro.png"
import Footer from "./Footer";

var flexgap = {
  gap: "30px",
};

function Home() {
  return (
    <div className="bg-light">
      <Navbar />
      <section>
        <div className="container mt-sm-5 ">
          <div className="row">
            <div className="col-sm-8 fs-xl d-flex flex-column justify-content-center">
              <h1 className="fw-bold display-3 text-black mb-4">
                Get Instant
                <br />
                Approvals
              </h1>
              <p>Fast, Secure, and Reliable Loans Tailored to Your Needs</p>
              <div
                className="d-flex align-items-center my-2 mb-sm-4"
                style={flexgap}
              >
                <a
                  href="/registeruser"
                  className="btn btn-dark text-white rounded-pill"
                >
                  Get Started
                </a>
                <a href="/loanlist" className="text-dark ">
                  Learn more
                </a>
              </div>
            </div>
            <div className="hero rounded col-sm-4">
              <img src={hero} alt="img" />
            </div>
          </div>
        </div>
      {/* </section> */}
      {/* <section> */}
       <div className="container my-sm-5 rounded-4">  {/*  style={{backgroundColor: "rgba(255, 114, 94, 0.1)"}} */}
          <div className="row justify-content-between">
            <div className="col-sm-4 fs-xl">
            <img src={img2} alt="img" />
            </div>
            <div className="hero rounded col-sm-6 d-flex flex-column justify-content-center p-4">
              <h1 className="fw-bold display-3 text-black mb-4">
              Apply Online
              </h1>
              <p>Complete a simple application form with your personal and financial details. Upload the necessary documents and submit your request.</p>
            </div>
          </div>
        </div>
      {/* </section> */}
      {/* <section> */}
        <div className="container my-sm-5 rounded-4">
          <div className="row justify-content-between">
            <div className="hero rounded col-sm-6 d-flex flex-column justify-content-center p-4">
              <h1 className="fw-bold display-3 text-black mb-4">
              Flexible Loan<br/>Terms
              </h1>
              <p>We offer a variety of loan products with competitive interest rates and repayment options that suit your needs.</p>
            </div>
            <div className="col-sm-4 fs-xl">
            <img src={img3} alt="img" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
