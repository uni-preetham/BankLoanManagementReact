import React from "react";
import Logo from "./../logo.png"

function Footer() {
  return (
    <>
      <footer style={{ fontSize: '14px' }}>
      <div className="row bg-white pt-3">
        <div className="col-4 d-flex flex-column justify-content-center align-items-center border-end">
          <div className="w-50">
            <a className="navbar-brand my-2" href="#">
              <img src={Logo} alt="" />
            </a>
            <p className="text-grey my-3">
            Find the perfect loan with competitive rates, flexible terms, and tailored solutions—just for you
            </p>
          </div>
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex align-items-center justify-content-around w-75">
            <ul className="list-unstyled">
              <li className="my-3"><a href="#" className="nav-link">Careers</a></li>
              <li className="my-3"><a href="#" className="nav-link">T&C</a></li>
              <li className="my-3"><a href="#" className="nav-link">FAQs</a></li>
              <li className="my-3"><a href="#" className="nav-link">Privacy Policy</a></li>
            </ul>
            <ul className="list-unstyled">
              <li className="my-3"><a href="#" className="nav-link"/>Instagram</li>
              <li className="my-3"><a href="#" className="nav-link"/>Facebook</li>
              <li className="my-3"><a href="#" className="nav-link"/>Twitter</li>
              <li className="my-3"><a href="#" className="nav-link"/>Phone</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-grey mt-3">&copy;2024 LendIt</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
