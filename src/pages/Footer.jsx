import React from "react";
import Logo from "./../logo.png"
import { FaInstagram, FaFacebook, FaTwitter, FaPhone  } from "react-icons/fa";

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
            <div className="socials fw-semibold">
              <p>Follow us on</p>
            <ul className="list-unstyled d-flex" style={{gap: "40px"}}>
              <li className="my-3"><a href="http://www.instagram.com" className="nav-link"><FaInstagram /></a></li>
              <li className="my-3"><a href="http://www.facebook.com" className="nav-link"><FaFacebook /></a></li>
              <li className="my-3"><a href="http://www.x.com" className="nav-link"><FaTwitter /></a></li>
              <li className="my-3"><a href="#" className="nav-link"><FaPhone /></a></li>
            </ul>
            </div>
          </div>
        </div>
        <p className="text-center text-grey mt-3">&copy;2024 LendIt</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
