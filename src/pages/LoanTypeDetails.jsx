import React from "react";
import Navbar from "../navbar/Navbar";
import BanksWithLoans from "../bank/BankDetails";

function LoanTypeDetails() {
  return (
    <>
        <Navbar />
        <div className=" bg-light">
      <section className="container">
        <BanksWithLoans />
      </section>
      </div>
    </>
  );
}

export default LoanTypeDetails;
