import React from "react"
import logo from "../../components/assets/images/logo.svg"
import { Link } from "react-router-dom"

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>

          {/* <div className="col-md-8">
              <div className="d-flex form-inputs">
              <i className='fa fa-search'></i>
                <input className="form-control" type="text" placeholder="Search any product..." />
                <i className="bx bx-search" />
              </div>
            </div> */}

          <div className='icon f_flex width'>
            <i className='fa fa-user icon-circle'></i>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="header-main border-bottom bg-white">
        <div className="container-fluid">
          <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
            <div className="col-md-2">
              <img className="d-none d-md-flex" src="https://i.imgur.com/R8QhGhk.png" width={100} />
            </div>
            <div className="col-md-8">
              <div className="d-flex form-inputs">
                <input className="form-control" type="text" placeholder="Search any product..." />
                <i className="bx bx-search" />
              </div>
            </div>
            <div className="col-md-2">
              <div className="d-flex d-none d-md-flex flex-row align-items-center">
                <Link to='/cart'>
                  <span className="shop-bag"><i className='fa fa-shopping-bag icon-circle' /></span> 
                  <span className="qty">{CartItem.length === 0 ? "" : CartItem.length} Product</span> */}
                  {/* <div className="d-flex flex-column ms-2">
                    <span className="qty">{CartItem.length === 0 ? "" : CartItem.length} Product</span>
                    <span className="fw-bold">$27.90</span>
                  </div> */}
                {/* </Link>

              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  )
}

export default Search
