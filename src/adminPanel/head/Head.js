import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../logo/logo_new.png';
import { SlLogout } from 'react-icons/sl';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaUserTie } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';

const Head = () => {

  const user = useSelector(state => state.user)
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('click')
    dispatch(logout())
    navigation('/')
  }

  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg bg-light shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/dashboard'> <img className="d-none d-md-flex" src={logo} alt='' width={110} /></Link>
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
              <li className="nav-item">
                <Link to='/dashboard/orders' className="nav-link">Orders</Link>
              </li>
            </ul>
            <div className="dropdown me-5">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cosmedicos {user?.user?.username}
              </button>
              <ul className="dropdown-menu text-small shadow me-5">
                <li><a className="dropdown-item" href="#"><FaUserTie /> {user?.user?.first_name} {user?.user?.last_name}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='#'><AiOutlineHome /> Home</Link></li>
                <li><Link className="dropdown-item" to='#'><CgProfile /> Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={handleLogout}><SlLogout /> Sign Out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Head
