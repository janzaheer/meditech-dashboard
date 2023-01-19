import React from "react"
import Catg from "./Catg"
import ShopCart from "./ShopCart"
import "./style.css"

const Shop = ({ addToCart, shopItems }) => {
  return (
    <>

      <section className='shop background'>
        <div className="container">
          <div className='container d_flex'>
            {/* <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                
              </ul>
            </div> */}

            <Catg />


            <div className='contentWidth'>
              <div className='heading d_flex'>
                <div className='heading-left row  f_flex'>
                  <h2>Mobile Phones</h2>
                </div>
                <div className='heading-right row '>
                  <span>View all</span>
                  <i className='fa-solid fa-caret-right'></i>
                </div>
              </div>
              <div className='product-content  grid1'>
                <ShopCart addToCart={addToCart} shopItems={shopItems} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Shop
