import React, { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import './new.css'
import { FiBellOff } from "react-icons/fi";
import { BiSearchAlt } from 'react-icons/bi'
import { HiOutlineShoppingCart } from "react-icons/hi";
// import logo from '../../../public/images/logo/logo.png'
import logo from '../../logo/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { getCartTotal } from "../../store/cartSlice";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { totalItems } = useSelector((state => state.cart));

  const navigate = useNavigate()
  const handleSearchTerm = (e) => {
    e.preventDefault();
    if (e.key == 'Enter') {
      setSearchTerm(e.target.value);
      navigate(`search/${searchTerm}`)
    }

    // setSearchTerm('')

  }

  console.log('search', searchTerm)

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // const handleSearch = () => {
  //   if (searchVal.length !== 0) {
  //     let sensitive_search_local = getSensitiveSearch();
  //     if (sensitive_search_local != searchVal) {
  //       setSensitiveSearch(searchVal)
  //     }
  //     loadCommunityData('', true);
  //   }
  // }

  // const handleSearchKeyPress = e => {
  //   if (e.key == 'Enter') {
  //     handleSearchTerm()
  //     navigate(`search/${searchTerm}`)

  //   }
  // }


  return (
    <>
      <header className="section-header sticky-top shadow">

        <section className="header-main border-bottom bg-white">
          <div className="container-fluid">
            <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
              <div className="col-md-2">
                <NavLink  to='/'>
                  <img className="d-none d-md-flex" src={logo} alt='' width={110} />
                </NavLink>
              </div>
              <div className="col-md-8">
                <div className="d-flex form-inputs">

                  <input className="form-control" type="text" placeholder="Search any product..." onKeyUp={(e) => handleSearchTerm(e)} />


                  {/* <form>
                    <input className="form-control" type="text" placeholder="Search any product..." onChange={(e) => handleSearchTerm(e)}  onKeyPress={handleSearchKeyPress} />
                  </form> */}

                  {/* <Link to = {`search/${searchTerm}`} 
                  className='text-dark '
                  >
                  <BiSearchAlt/>
                </Link> */}
                </div>
              </div>
              <div className="col-md-2">
                <div className="d-flex d-none d-md-flex flex-row align-items-center">
                  <Link to='/cart'>
                    <span className="shop-bag"><HiOutlineShoppingCart /></span>
                  </Link>
                  <div className="d-flex flex-column ms-2">
                    <span className="qty">{totalItems} Product</span>
                    {/* <span className="fw-bold">Rs {totalAmount} </span> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

       {/* <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand d-md-none d-md-flex" to="#">Categories</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav"> */}
                {/* <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/cart">cart or Electronics</Link>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/account'>Account</NavLink>
                </li> */}
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to='/contact'>Contact</NavLink>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/productD">details</Link>
                </li> */}
                {/* <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mobiles
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to="#"><FiBellOff /> Smart Phones</Link></li>
                    <li><Link className="dropdown-item" to="#">Feature Phones</Link></li>
                    <li><Link className="dropdown-item" to="#">Mobile Covers</Link></li>
                  </ul>
                </li> */}

              {/* </ul>
            </div>
          </div>
        </nav> */}
      </header>

    </>
  )
}

export default Navbar
