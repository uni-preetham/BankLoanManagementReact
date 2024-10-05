import React from "react";
import Navbar from "../navbar/Navbar";

function Timeout() {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column justify-content-center align-items-center bg-light rounded my-5 py-5">
        <h1>Error 69: Are you lost babygirl?</h1>
        <small>(Error 404: Session time out)</small>
        <a href="/login" className="text-dark my-5">
          Please login again
        </a>
      </div>
    </>
  );
}

export default Timeout;
