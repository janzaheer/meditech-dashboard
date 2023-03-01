import React from "react"
import { NavLink } from "react-router-dom"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer className="px-md-5 py-5 text-white">
        <div className="container-fluid" style="display:none">
          <div className="row w-100">
            <div className="col-md-3">
              <div className='box'>
                <h1>Cosmedicos</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus.</p>
                <div className='d-flex justify-content-between'>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm" ><i className='fa-brands fa-google-play'></i> Google Play</button>
                  </div>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm" ><i className='fa-brands fa-app-store-ios'></i> App Store</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className='box'>
                <h2>About Us</h2>
                <ul>
                  <li>Careers</li>
                  <li>Our Stores</li>
                  <li>Our Cares</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className='box'>
                <h2>Customer Care</h2>
                <ul>
                  <li>Help Center </li>
                  <li>How to Buy </li>
                  <li>Track Your Order </li>
                  <li>Corporate & Bulk Purchasing </li>
                  <li>Returns & Refunds </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className='box'>
                <h2>Contact Us</h2>
                <ul>
                  <li><NavLink className='text-white' to='/contact'>Contact us</NavLink></li>
                  <li>H34 street 6 M7C Lake City Lahore Pakistan Asia Earth </li>
                  <li>Email: Cosmedicos@gmail.com</li>
                  <li>Phone: +93 1234 567 890</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
