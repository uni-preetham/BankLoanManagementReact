import React from "react";
import Navbar from "../navbar/Navbar";

function Timeout() {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column justify-content-center align-items-center bg-light rounded my-5 py-5">
        <h1>Error 440: Session has expired.</h1>
        <a href="/login" className="text-dark my-5">
          Please login again
        </a>
      </div>
    </>
  );
}

export default Timeout;
