import React from "react"
import Ndata from "./Ndata"

const Cart = () => {
  return (
    <>
           <div className='content grid product'>
        {Ndata.map((val, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={val.cover} alt='' />
              </div>
              <h4>{val.name}</h4>
              <span>${val.price}</span>
            </div>
          )
        })}
      </div>

<div className="container py-1">
  
  {/* First Row [Prosucts]*/}
  <h2 className="font-weight-bold mb-2">From the Shop</h2>
  <div className="row pb-5 mb-4 w-100">
    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
      {/* Card*/}
      <div className="card rounded shadow-sm border-0">
        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-1_gthops.jpg" alt className="img-fluid d-block mx-auto mb-3" style={{width: '200px'}} />
          <h5> <a href="#" className="text-dark">product 1</a></h5>
          <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <ul className="list-inline small">
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star-o text-success" /></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
      {/* Card*/}
      <div className="card rounded shadow-sm border-0">
        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-2_g4qame.jpg" alt className="img-fluid d-block mx-auto mb-3" style={{width: '200px'}} />
          <h5> <a href="#" className="text-dark">product 2</a></h5>
          <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <ul className="list-inline small">
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star-o text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star-o text-success" /></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
      {/* Card*/}
      <div className="card rounded shadow-sm border-0">
        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-3_rk25rt.jpg" alt className="img-fluid d-block mx-auto mb-3" style={{width: '200px'}} />
          <h5> <a href="#" className="text-dark">product 3</a></h5>
          <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <ul className="list-inline small">
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
      {/* Card*/}
      <div className="card rounded shadow-sm border-0">
        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-4_vgfjy9.jpg" alt className="img-fluid d-block mx-auto mb-3" style={{width: '200px'}} />
          <h5> <a href="#" className="text-dark">product 4</a></h5>
          <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <ul className="list-inline small">
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
            <li className="list-inline-item m-0"><i className="fa fa-star-o text-success" /></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>


 
    </>
  )
}

export default Cart
