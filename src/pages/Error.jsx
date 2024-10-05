import React from "react";
import Navbar from "../navbar/Navbar";



function Error() {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column justify-content-center align-items-center bg-light rounded my-5 py-5">
          <h1>Error 69: Are you lost babygirl?</h1>
          <small>(Error 404: Requested page not found)</small>
          <a href="/" className="text-dark my-5">Return to home</a>
      </div>
    </>
  );
}

export default Error;
