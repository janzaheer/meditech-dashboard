import React, { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import './new.css'
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
      navigate(`search/${e.target.value}`)
      console.log('value',e.target.value)
      console.log('searchterm',searchTerm)
    }

    // setSearchTerm('')

  }

  console.log('search', searchTerm)

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <header className="section-header sticky-top shadow">
        <section className="header-main border-bottom bg-white">
          <div className="container-fluid">
            <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
              <div className="col-md-2">
                <NavLink to='/'>
                  <img className="d-md-flex" src={logo} alt='' width={110} />
                </NavLink>
              </div>
              <div className="col-md-8">
                <div className="d-flex form-inputs">
                  <input className="form-control" type="text" placeholder="Search any product..." onKeyUp={(e) => handleSearchTerm(e)} />
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
      </header>

    </>
  )
}

export default Navbar