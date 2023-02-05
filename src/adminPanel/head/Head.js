import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../logo/logo.png'

const Head = () => {
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'> <img className="d-none d-md-flex" src={logo} alt='' width={110} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/dashboard' className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to='/dashboard/products' className="nav-link">Products</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to='/dashboard/orders' className="nav-link">Orders</Link>
              </li>
            </ul>
            <div className="dropdown me-5">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
               MediTech Admin
              </button>
              <ul className="dropdown-menu text-small shadow me-5">
              <li><a className="dropdown-item" href="#">admin@gmail.com</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Home</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Head