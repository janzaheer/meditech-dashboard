import React from "react"
import { Link } from "react-router-dom"
import { BsEmojiSmile, BsBox } from 'react-icons/bs'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { SlLogout } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/authSlice"
import { useNavigate } from 'react-router-dom';


const Head = () => {
  const user = useSelector(state => state.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
    navigation("/")
  }
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand p-0 bg-success">
        <div className="container-fluid">
          <ul className="navbar-nav d-none d-md-flex mr-auto">
            <li className="nav-item"><a className="nav-link text-white" href="#" data-abc="true"><i className='fa fa-phone'></i> +92 317 801 2324</a> </li>
            <li className="nav-item"><a className="nav-link text-white" href="#" data-abc="true"><i className='fa fa-envelope'></i>  cosmedicosofficial@gmail.com</a></li>
          </ul>

          <ul className="navbar-nav d-flex align-items-center">
            {isAuthenticated ?
              <li className="nav-item me-5">
                <div className="dropdown me-5">
                  <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome {user?.user?.username}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-light">
                    <li><Link to='/manageProfile' className="dropdown-item"><BsEmojiSmile /> Manage My Account</Link></li>
                    {user.user.is_seller == true ? <li><Link className="dropdown-item" to='/dashboard'><BsBox /> Admin</Link></li> : ''}
                    <li><Link to='/favorite' className="dropdown-item"><MdOutlineFavoriteBorder /> My favorites</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}><SlLogout /> Logout</a></li>
                  </ul>
                </div>
              </li>
              : <li className="nav-item me-5">
                <div className="me-5">
                  <Link className="btn btn-danger btn-sm"to='/login'>Login Now</Link>
                </div>
              </li>
            }
          </ul>
        </div>
      </nav>

    </>
  )
}

export default Head
